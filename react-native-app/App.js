import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationAction, TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Store from './src/redux/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import JobsScreen from './src/screens/JobsScreen';
import MapScreen from './src/screens/MapScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StartingScreen from './src/screens/StartingScreen';

import {
  WELCOME_SCREEN,
  AUTH_SCREEN,
  JOBS_SCREEN,
  MAP_SCREEN,
  REVIEW_SCREEN,
  SETTINGS_SCREEN,
  STARTING_SCREEN,
} from './src/constants';

import styles from './src/styles/Styles';

export default class App extends React.Component {
  render() {
    const MainNavigation = TabNavigator({
      [STARTING_SCREEN]: { screen: StartingScreen },
      [WELCOME_SCREEN]: { screen: WelcomeScreen },
      [AUTH_SCREEN]: { screen: AuthScreen },
      MainTab: { screen: TabNavigator({
        [MAP_SCREEN]: { screen: MapScreen },
          [JOBS_SCREEN]: { screen: JobsScreen },
          ReviewTab: { screen: StackNavigator({
            [REVIEW_SCREEN]: { screen: ReviewScreen },
            [SETTINGS_SCREEN]: { screen: SettingsScreen }
            },{
              lazy: true,
              swipeEnabled: false,
              animationEnabled: false,
            })
          },
        },{
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          animationEnabled: false,
          lazy: true
        })
      },

    },{
      //tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }     
    })

    return (
      <Provider store={Store.store}>
        <View style={styles.appContainer}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

