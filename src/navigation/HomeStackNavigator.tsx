import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderBookScreen from '../screens/OrderBook/OrderBookScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home Screen'}}
      />
      <Stack.Screen
        name="OrderBookScreen"
        component={OrderBookScreen}
        options={{title: 'Order Book'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
