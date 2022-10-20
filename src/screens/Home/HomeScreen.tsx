import React, {FC} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import PrimaryButton from '../../components/custom/PrimaryButton';
import WebSocketService from '../../utils/WebSocketService';

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
            props.navigation.navigate('OrderBookScreen', {});
          }}
        />
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

export default HomeScreen;
