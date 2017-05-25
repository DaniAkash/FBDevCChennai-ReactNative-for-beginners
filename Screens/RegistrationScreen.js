import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RegistrationScreen extends Component {

    componentWillMount() {
        console.log(this.props);
        debugger;
    }

    render() {
        return (
            <View>
                <Text>Hello {this.props.navigation.state.params.name}!</Text>
            </View>
        );
    }
}