import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
    NavigationActions
} from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ 
        routeName: 'Registration',
        params: {name : 'test'},
    })
  ]
})

export default class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentWillMount() {
        setTimeout(()=> {
            this.props.navigation.dispatch(resetAction)
        }, 3000);
    }

    render() {
        return (
            <View>
                <Text>Hello World!</Text>
            </View>
        );
    }
}