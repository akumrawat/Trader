import React, {FC} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './src/navigation/HomeStackNavigator';

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#142D3D',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
