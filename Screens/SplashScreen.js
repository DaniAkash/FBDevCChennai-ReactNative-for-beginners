import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentWillMount() {
        setTimeout(()=> {
            this.props.navigation.navigate('Registration', {name: 'Registration Page'})
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