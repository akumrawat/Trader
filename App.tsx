import React, {FC} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {AppTheme} from './src/constants/colors';
import MainNavigationContainer from './src/navigators';

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <MainNavigationContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: AppTheme.colors.primaryBackgroundColor,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
