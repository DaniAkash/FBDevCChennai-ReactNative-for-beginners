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
        routeName: 'EventsList',
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome!</Text>
            </View>
        );
    }
}