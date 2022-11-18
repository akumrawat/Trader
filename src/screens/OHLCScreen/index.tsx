import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import OrderBookList from '../../components/custom/OrderBookList';
import PrimaryButton from '../../components/custom/PrimaryButton';
import {AppTheme} from '../../constants/colors';
import useOrderBook from '../../utils/hooks/useOrderBook';

const OHLCScreen: FC = (): JSX.Element => {
  const [orders, onPressClose, onPressOpen] = useOrderBook();

  return (
    <View style={styles.backgroundStyle}>
      <PrimaryButton title="open" onPress={onPressOpen} />
      <PrimaryButton title="close" onPress={onPressClose} />
      <View style={styles.parentOrderBookView}>
        <View style={styles.flexView}>
          <OrderBookList
            orders={orders.bids}
            totalQuantity={orders.totalBids}
            flexDirection={'row'}
            backgroundColor={AppTheme.colors.bidsBackgroundColor}
            amountMultiplier={1}
          />
        </View>
        <View style={styles.flexView}>
          <OrderBookList
            orders={orders.asks}
            totalQuantity={orders.totalAsks}
            flexDirection={'row-reverse'}
            backgroundColor={AppTheme.colors.asksBackgroundColor}
            amountMultiplier={-1}
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

export default OHLCScreen;
