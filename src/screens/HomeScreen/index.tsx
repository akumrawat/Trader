import React, {FC} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import PrimaryButton from '../../components/custom/PrimaryButton';
import {AppTheme} from '../../constants/colors';
import {ScreenNames} from '../../navigators/constants/ScreenNames';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen: FC<HomeScreenProps> = (props): JSX.Element => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <View style={styles.backgroundStyle}>
        <PrimaryButton
          title="Order Book"
          onPress={() => {
            props.navigation.navigate(ScreenNames.OrderBook, {});
          }}
        />
        <PrimaryButton
          title="OHLC"
          onPress={() => {
            props.navigation.navigate(ScreenNames.OHLCScreen, {});
          }}
        />
      </View>
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

export default HomeScreen;
