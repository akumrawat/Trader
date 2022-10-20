import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import PrimaryButton from '../../components/custom/PrimaryButton';
import {getAsks, getBids} from '../../utils/OrderBookUtils';
import WebSocketService, {
  WebSocketServiceType,
} from '../../utils/WebSocketService';

const windowWidthHalf = Dimensions.get('window').width / 2;

const OrderBookScreen: FC = (): JSX.Element => {
  const [orders, setOrders] = useState({
    bids: [],
    asks: [],
    totalBids: 0,
    totalAsks: 0,
  });
  const webSocketService = new WebSocketService();

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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={orders.bids}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}>
                  <View
                    style={{
                      flex: 1,
                    }}></View>
                  <View
                    style={{
                      backgroundColor: '#10454B',
                      width: (item[3] / orders.totalBids) * windowWidthHalf,
                    }}></View>
                </View>
                <View style={{flexDirection: 'row'}}>
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
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={orders.asks}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#403340',
                      width: (item[3] / orders.totalAsks) * windowWidthHalf,
                    }}></View>
                  <View
                    style={{
                      flex: 1,
                    }}></View>
                </View>
                <View style={{flexDirection: 'row'}}>
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
  orderText: {color: 'white', flex: 1, textAlign: 'center', fontSize: 11},
});

export default OrderBookScreen;
