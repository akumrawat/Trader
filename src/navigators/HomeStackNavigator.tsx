import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderBookScreen from '../screens/OrderBookScreen';
import HomeScreen from '../screens/HomeScreen';
import {ScreenNames} from './constants/ScreenNames';

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
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
