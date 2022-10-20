export enum WebSocketServiceType {
  OrderBook,
}

export default class WebSocketService {
  private socket: WebSocket | undefined;

  public initSocket(type: WebSocketServiceType) {
    if (this.socket === undefined) {
      this.socket = new WebSocket(this.getSocketURL(type));
      this.socket.onopen = () => {
        switch (type) {
          case WebSocketServiceType.OrderBook:
            let msg = JSON.stringify({
              event: 'subscribe',
              channel: 'book',
              symbol: 'tBTCUSD',
            });
            let config = JSON.stringify({
              event: 'conf',
              flags: 536870912,
            });
            this.socket?.send(msg);
            this.socket?.send(config);
        }
      };
    }
  }

  public closeWebSocket() {
    this.socket?.close();
    this.socket = undefined;
  }

  public onMessage(callback: (event: WebSocketMessageEvent) => void) {
    if (this.socket !== undefined) {
      this.socket.onmessage = callback;
    }
  }

  private getSocketURL(type: WebSocketServiceType): string {
    switch (type) {
      case WebSocketServiceType.OrderBook:
        return 'wss://api-pub.bitfinex.com/ws/2';
    }
  }
}
