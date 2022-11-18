import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from './constants/ScreenNames';
import {HomeScreen, OHLCScreen, OrderBookScreen} from '../screens';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{title: 'Home Screen'}}
      />
      <Stack.Screen
        name={ScreenNames.OrderBook}
        component={OrderBookScreen}
        options={{title: 'Order Book'}}
      />
      <Stack.Screen
        name={ScreenNames.OHLCScreen}
        component={OHLCScreen}
        options={{title: 'OHLC'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
