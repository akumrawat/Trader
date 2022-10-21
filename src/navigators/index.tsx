import HomeStackNavigator from './HomeStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

const MainNavigationContainer: React.FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
