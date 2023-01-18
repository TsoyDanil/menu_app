import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import OrderDishApp from './src/containers/OrderDishApp';
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <OrderDishApp/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
