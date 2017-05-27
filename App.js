import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import SplashScreen from './Screens/SplashScreen';
import EventsList from './Screens/EventsList';
import RegistrationScreen from './Screens/RegistrationScreen';

export default StackNavigator({ 
    Splash: {
        screen: SplashScreen
    },
    EventsList: {
        screen: EventsList
    },
    Registration: {
        path: 'Registration/:name',
        screen: RegistrationScreen
    }, 
});