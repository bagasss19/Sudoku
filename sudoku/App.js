import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Board from './component/Board'
import Home from './component/home'
import Finish from './component/finish'
import {Provider} from 'react-redux'
import store from './redux'

const Stack = createStackNavigator()


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
    
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Welcome to the Sudoku!' }}
      />
      <Stack.Screen
        name="Board"
        component={Board}
        options={{ title: 'Enjoy the Game!' }}
      />
      <Stack.Screen
        name="Finish"
        component={Finish}
        options={{ title: 'Finish!' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
