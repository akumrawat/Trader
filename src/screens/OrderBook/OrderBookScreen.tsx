import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import PrimaryButton from '../../components/custom/PrimaryButton';
import {getAsks, getBids} from '../../utils/OrderBookUtils';
import WebSocketService, {
  WebSocketServiceType,
} from '../../utils/WebSocketService';

const windowWidthHalf = Dimensions.get('window').width / 2;
const webSocketService = new WebSocketService();

const OrderBookScreen: FC = (): JSX.Element => {
  const [orders, setOrders] = useState({
    bids: [],
    asks: [],
    totalBids: 0,
    totalAsks: 0,
  });

  function getSum(total: number, ele: number[]) {
    return total + ele[2];
  }

  const updateOrders = (ordersBatch: any[][]) => {
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

  return (
    <View style={styles.backgroundStyle}>
      <PrimaryButton
        title="open"
        onPress={() => {
          webSocketService.initSocket(WebSocketServiceType.OrderBook);
          webSocketService.onMessage(msgs => {
            if (msgs.data !== undefined) {
              const ordersBatch = JSON.parse(msgs.data)[1];

              if (ordersBatch !== undefined && Array.isArray(ordersBatch)) {
                updateOrders(ordersBatch);
              }
            }
          });
        }}
      />
      <PrimaryButton
        title="close"
        onPress={() => {
          webSocketService.closeWebSocket();
        }}
      />
      <View style={styles.parentOrderBookView}>
        <View style={styles.flexView}>
          <FlatList
            data={orders.bids}
            renderItem={({item}) => (
              <View>
                <View style={styles.orderBookBackgroundView}>
                  <View style={styles.flexView} />
                  <View
                    style={{
                      ...styles.bidsColorView,
                      width: (item[3] / orders.totalBids) * windowWidthHalf,
                    }}
                  />
                </View>
                <View style={styles.rowFlexView}>
                  <Text style={styles.orderText}>{item[1]}</Text>
                  <Text style={styles.orderText}>
                    {parseFloat(item[2]).toPrecision(4)}
                  </Text>
                  <Text style={styles.orderText}>{item[0]}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.flexView}>
          <FlatList
            data={orders.asks}
            renderItem={({item}) => (
              <View>
                <View style={styles.orderBookBackgroundView}>
                  <View
                    style={{
                      ...styles.asksColorView,
                      width: (item[3] / orders.totalAsks) * windowWidthHalf,
                    }}
                  />
                  <View style={styles.flexView} />
                </View>
                <View style={styles.rowFlexView}>
                  <Text style={styles.orderText}>{item[0]}</Text>
                  <Text style={styles.orderText}>
                    {(parseFloat(item[2]) * -1).toPrecision(4)}
                  </Text>
                  <Text style={styles.orderText}>{item[1]}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#142D3D',
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
    backgroundColor: '#10454B',
  },
  asksColorView: {
    backgroundColor: '#403340',
  },
});

export default OrderBookScreen;
