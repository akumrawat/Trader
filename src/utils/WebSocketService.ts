import {WebSocketServiceType} from '../types/OrderBookModel';

export default class WebSocketService {
  public socket!: WebSocket | null;

  public initSocket(type: WebSocketServiceType) {
    if (!this.socket) {
      this.socket = new WebSocket(type.socketURL);
      this.socket.onopen = () => {
        this.socket?.send(type.message);
        this.socket?.send(type.config);
      };
    }
  }

  public closeWebSocket() {
    this.socket?.close();
    this.socket = null;
  }

  public onMessage(handler: (event: WebSocketMessageEvent) => void) {
    if (this.socket !== null) {
      this.socket.onmessage = handler;
    }
  }
}
