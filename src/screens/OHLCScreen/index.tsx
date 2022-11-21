import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {VictoryAxis, VictoryCandlestick, VictoryChart} from 'victory-native';
import PrimaryButton from '../../components/custom/PrimaryButton';
import {AppTheme} from '../../constants/colors';
import useOHLC from '../../utils/hooks/useOHLC';

const OHLCScreen: FC = (): JSX.Element => {
  const [orders, onPressClose, onPressOpen] = useOHLC();
  return (
    <View style={styles.backgroundStyle}>
      <PrimaryButton title="open" onPress={onPressOpen} />
      <PrimaryButton title="close" onPress={onPressClose} />
      <VictoryChart domainPadding={{x: 10, y: 10}} scale={{x: 'time'}}>
        <VictoryAxis
          style={{
            grid: {stroke: '#F4F5F7', strokeWidth: 0.2},
          }}
          tickFormat={t => `${t.getDate()}/${t.getMonth()}`}
        />
        <VictoryAxis
          dependentAxis
          style={{
            grid: {stroke: '#F4F5F7', strokeWidth: 0.2},
          }}
        />
        <VictoryCandlestick
          style={{
            data: {
              stroke: 'white',
              strokeWidth: 0.5,
            },
          }}
          candleWidth={10}
          candleColors={{positive: '#1bfa02', negative: '#fa0202'}}
          data={orders}
        />
      </VictoryChart>
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
