import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';

export default class RegistrationScreen extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Text>Hello {this.props.navigation.state.params.name}!</Text>
            </ScrollView>
        );
    }
}