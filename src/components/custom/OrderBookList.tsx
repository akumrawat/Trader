import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import {AppTheme} from '../../constants/colors';
import {OrderBookModel} from '../../types/OrderBookModel';

export const OrderType = {
  bids: 'bids',
  asks: 'asks',
};

interface OrderBookListProps {
  orderType: string;
  orders: OrderBookModel[];
  totalQuantity: number;
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
              flexDirection:
                props.orderType === OrderType.bids ? 'row' : 'row-reverse',
            }}>
            <View style={styles.flexView} />
            <View
              style={{
                backgroundColor:
                  props.orderType === OrderType.bids
                    ? AppTheme.colors.bidsBackgroundColor
                    : AppTheme.colors.asksBackgroundColor,
                width:
                  (item.totalAmount / props.totalQuantity) * windowWidthHalf,
              }}
            />
          </View>
          <View
            style={{
              flexDirection:
                props.orderType === OrderType.bids ? 'row' : 'row-reverse',
            }}>
            <Text style={styles.orderText}>{item.count}</Text>
            <Text style={styles.orderText}>
              {(
                item.amount * (props.orderType === OrderType.bids ? 1 : -1)
              ).toPrecision(4)}
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
