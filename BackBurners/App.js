import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './client/src/store/index'
import { Platform, StyleSheet, Text, View } from 'react-native';
import Constants  from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import { Navbar, Link, Landing, Login, SignUp, BudgetSetup } from './client/src';

async function enablePushNotifs() {
  if (!Constants.isDevice) {
    return;
  }
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    return;
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pageLoaded: false,
    };
  }

  async componentDidMount() {
    //await enablePushNotifs();
    
    this.setState({ pageLoaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.pageLoaded ? (
          <AppNavigator />
        ) : (
        <View>
          <Text style={{color: 'black'}}>Loading.......</Text>
        </View>
        )}
      </Provider>
    );
  }
}

const AuthenticationNavigator = createStackNavigator({
  //Landing: { screen: Landing},
  Login: { screen: Login},
  //SignUp: { screen: SignUp },
  //Link: { screen: Link },
  //BudgetSetup: { screen: BudgetSetup },
  //EditCategories: { screen: EditCategories },
});

const AppNavigator2 = createSwitchNavigator({
  //Auth: { screen: AuthenticationNavigator },
  Main: { screen: Navbar }
});

const AppNavigator = createAppContainer(AppNavigator2);