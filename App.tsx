import React, {FC} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import PrimaryButton from './src/components/custom/PrimaryButton';

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <View style={styles.backgroundStyle}>
        <PrimaryButton title="Order Book" />
      </View>
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
