import {OrderBookModel} from '../types/OrderBookModel';

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

  public onMessage(callback: (ordersBook: OrderBookModel[]) => void) {
    if (this.socket !== undefined) {
      this.socket.onmessage = msgs => {
        if (msgs.data !== undefined) {
          const ordersBatchResponse = JSON.parse(msgs.data)[1];
          if (
            ordersBatchResponse !== undefined &&
            Array.isArray(ordersBatchResponse)
          ) {
            let ordersBatch: OrderBookModel[] = ordersBatchResponse.map(
              (ele: any[]) => {
                let model: OrderBookModel = {
                  price: ele[0],
                  count: ele[1],
                  amount: ele[2],
                  totalAmount: 0,
                };
                return model;
              },
            );
            callback(ordersBatch);
          }
        }
      };
    }
  }

  private getSocketURL(type: WebSocketServiceType): string {
    switch (type) {
      case WebSocketServiceType.OrderBook:
        return 'wss://api-pub.bitfinex.com/ws/2';
    }
  }
}
