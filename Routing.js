import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
    View
  } from 'react-native';
import Home from './screens/Home';



const MainStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'البيت',
      header: null,
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  }
});

export default MainStack;
