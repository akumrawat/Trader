import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import PrimaryButton from '../../components/custom/PrimaryButton';
let ws: WebSocket;
const windowWidthHalf = Dimensions.get('window').width / 2;
const OrderBookScreen: FC = (): JSX.Element => {
  const [orders, setOrders] = useState({
    bids: [],
    asks: [],
    totalBids: 0,
    totalAsks: 0,
  });

  function getSum(total, ele) {
    return total + ele[2];
  }

  const updateOrders = (ordersBatch: any[]) => {
    let newBids = orders.bids;
    ordersBatch.forEach(order => {
      if (order !== undefined) {
        if (order[2] > 0) {
          const index = newBids.findIndex(ele => ele[0] === order[0]);
          if (index === -1) {
            newBids.push(order);
          } else {
            newBids[index] = order;
          }
        }
      }
    });
    newBids = newBids.filter(ele => ele[1] !== 0 && ele[0] !== undefined);

    let newAsks = orders.asks;
    ordersBatch.forEach(order => {
      if (order !== undefined) {
        if (order[2] < 0) {
          const index = newAsks.findIndex(ele => ele[0] === order[0]);
          if (index === -1) {
            newAsks.push(order);
          } else {
            newAsks[index] = order;
          }
        }
      }
    });
    newAsks = newAsks.filter(ele => ele[1] !== 0 && ele[0] !== undefined);
    newBids.sort(function (a, b) {
      return b[0] - a[0];
    });
    newAsks.sort(function (a, b) {
      return a[0] - b[0];
    });
    const newTotalBids = newBids.reduce(getSum, 0);
    const newTotalAsks = newAsks.reduce(getSum, 0);

    let bidsSum = 0;
    newBids.map(ele => {
      bidsSum = bidsSum + ele[2];
      ele[3] = bidsSum;
      return ele;
    });
    let asksSum = 0;
    newAsks.map(ele => {
      asksSum = asksSum + ele[2];
      ele[3] = asksSum;
      return ele;
    });

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
          ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
          let msg = JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
          });

          let config = JSON.stringify({
            event: 'conf',
            flags: 536870912,
          });

          ws.onopen = () => {
            ws.send(msg);
            ws.send(config);
          };

          ws.onmessage = msgs => {
            if (msgs.data !== undefined) {
              const ordersBatch = JSON.parse(msgs.data)[1];

              if (ordersBatch !== undefined && Array.isArray(ordersBatch)) {
                updateOrders(ordersBatch);
              }
            }
          };
        }}
      />
      <PrimaryButton
        title="close"
        onPress={() => {
          ws.close();
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
