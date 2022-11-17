import {useRef, useState} from 'react';
import {URLs} from '../../constants/urls';
import {
  OrderBookModel,
  OrdersBook,
  WebSocketServiceType,
} from '../../types/OrderBookModel';
import {getBids, getAsks} from '../../utils';
import WebSocketService from '../../utils/WebSocketService';

function handleOrderBookMessage(
  event: WebSocketMessageEvent,
): OrderBookModel[] | null {
  if (event.data !== undefined) {
    const ordersBatchResponse = JSON.parse(event.data)[1];
    if (
      ordersBatchResponse !== undefined &&
      Array.isArray(ordersBatchResponse)
    ) {
      let ordersBatch: OrderBookModel[] = ordersBatchResponse.map(
        (ele: number[]) => {
          let model: OrderBookModel = {
            price: ele[0],
            count: ele[1],
            amount: ele[2],
            totalAmount: 0,
          };
          return model;
        },
      );
      return ordersBatch;
    }
    return null;
  }
  return null;
}

const orderBookSocketConfig: WebSocketServiceType = {
  message: JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD', /// configurable
  }),
  config: JSON.stringify({
    event: 'conf',
    flags: 536870912, /// variable for flag
  }),
  socketURL: URLs.webSocketURL,
  handler: handleOrderBookMessage,
};

const useOrderBook = (): [OrdersBook, () => void, () => void] => {
  const [orders, setOrders] = useState<OrdersBook>({
    bids: [],
    asks: [],
    totalBids: 0,
    totalAsks: 0,
  });
  const webSocketService = useRef<WebSocketService>(new WebSocketService());

  const getSum = (total: number, ele: OrderBookModel): number => {
    return total + ele.amount;
  };

  const updateOrders = (ordersBatch: OrderBookModel[]) => {
    const newBids = getBids(ordersBatch, orders.bids);
    const newAsks = getAsks(ordersBatch, orders.asks);
    const newTotalBids = newBids.reduce(getSum, 0);
    const newTotalAsks = newAsks.reduce(getSum, 0);

    setOrders({
      bids: newBids,
      asks: newAsks,
      totalBids: newTotalBids,
      totalAsks: newTotalAsks,
    });
  };

  const onPressOpen = () => {
    webSocketService.current.initSocket(orderBookSocketConfig);
    webSocketService.current.onMessage(event => {
      const ordersBatch = orderBookSocketConfig.handler(event);
      if (ordersBatch) {
        updateOrders(ordersBatch);
      }
    });
  };

  const onPressClose = () => {
    webSocketService.current.closeWebSocket();
  };

  return [orders, onPressClose, onPressOpen];
};

export default useOrderBook;
