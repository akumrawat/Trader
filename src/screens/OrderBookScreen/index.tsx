import React, {FC, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import OrderBookList, {OrderType} from '../../components/custom/OrderBookList';
import PrimaryButton from '../../components/custom/PrimaryButton';
import {AppTheme} from '../../constants/colors';
import {OrderBookModel} from '../../types/OrderBookModel';
import {extractAsks, extractBids} from '../../utils';
import WebSocketService, {
  WebSocketServiceType,
} from '../../utils/WebSocketService';

interface OrdersBook {
  bids: OrderBookModel[];
  asks: OrderBookModel[];
  totalBids: number;
  totalAsks: number;
}

const OrderBookScreen: FC = (): JSX.Element => {
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
    const newBids = extractBids(ordersBatch, orders.bids);
    const newAsks = extractAsks(ordersBatch, orders.asks);
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
    webSocketService.current.initSocket(WebSocketServiceType.OrderBook);
    webSocketService.current.onMessage((ordersBatch: OrderBookModel[]) => {
      if (ordersBatch !== undefined) {
        updateOrders(ordersBatch);
      }
    });
  };

  const onPressClose = () => {
    webSocketService.current.closeWebSocket();
  };

  return (
    <View style={styles.backgroundStyle}>
      <PrimaryButton title="open" onPress={onPressOpen} />
      <PrimaryButton title="close" onPress={onPressClose} />
      <View style={styles.parentOrderBookView}>
        <View style={styles.flexView}>
          <OrderBookList
            orderType={OrderType.bids}
            orders={orders.bids}
            totalQuantity={orders.totalBids}
          />
        </View>
        <View style={styles.flexView}>
          <OrderBookList
            orderType={OrderType.asks}
            orders={orders.asks}
            totalQuantity={orders.totalAsks}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: AppTheme.colors.primaryBackgroundColor,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  orderText: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
  },
  parentOrderBookView: {
    flex: 1,
    flexDirection: 'row',
  },
  flexView: {
    flex: 1,
  },
  orderBookBackgroundView: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  rowFlexView: {
    flexDirection: 'row',
  },
  bidsColorView: {
    backgroundColor: AppTheme.colors.bidsBackgroundColor,
  },
  asksColorView: {
    backgroundColor: AppTheme.colors.asksBackgroundColor,
  },
});

export default OrderBookScreen;
