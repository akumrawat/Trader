export interface OrdersBook {
  bids: OrderBookModel[];
  asks: OrderBookModel[];
  totalBids: number;
  totalAsks: number;
}

export interface OrderBookModel {
  price: number;
  amount: number;
  count: number;
  totalAmount: number;
}

export interface WebSocketServiceType {
  message: string;
  config: string;
  socketURL: string;
  handler: (event: WebSocketMessageEvent) => OrderBookModel[] | null;
}
