import React, {FC} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ColorValue,
} from 'react-native';
import {OrderBookModel} from '../../types/OrderBookModel';

interface OrderBookListProps {
  orders: OrderBookModel[];
  totalQuantity: number;
  flexDirection: 'row' | 'row-reverse' | undefined;
  backgroundColor: ColorValue;
  amountMultiplier: number;
}
const windowWidthHalf = Dimensions.get('window').width / 2;

const OrderBookList: FC<OrderBookListProps> = (props): JSX.Element => {
  return (
    <FlatList
      data={props.orders}
      renderItem={({item}) => (
        <View>
          <View
            style={{
              ...styles.orderBookBackgroundView,
              flexDirection: props.flexDirection,
            }}>
            <View style={styles.flexView} />
            <View
              style={{
                backgroundColor: props.backgroundColor,
                width:
                  (item.totalAmount / props.totalQuantity) * windowWidthHalf,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: props.flexDirection,
            }}>
            <Text style={styles.orderText}>{item.count}</Text>
            <Text style={styles.orderText}>
              {(item.amount * props.amountMultiplier).toPrecision(4)}
            </Text>
            <Text style={styles.orderText}>{item.price}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  orderText: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    flexDirection: 'row',
  },
  flexView: {
    flex: 1,
  },
  orderBookBackgroundView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default OrderBookList;
