import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  DatePickerAndroid,
} from 'react-native';

export default class RegistrationScreen extends Component {

    state = {
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: new Date(1990, 1, 1),
    }

    changeName(name) {
        this.setState({name});
    }

    changeEmail(email) {
        this.setState({email});
    }

    changePhoneNumber(phoneNumber) {
        this.setState({phoneNumber});
    }

    changeDateOfBirth(dateOfBirth) {
        this.setState({dateOfBirth});
    }

    async openDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(this.state.dateOfBirth),
                maxDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({dateOfBirth: new Date(year, month, day)})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Text style={{fontSize: 20, margin: 10}}>{this.props.navigation.state.params.name} Registration</Text>
                <View style={{flex: 1, margin: 10}}>
                    <TextInput
                        placeholder={'Your Name'}
                        value={this.state.name}
                        onChangeText={name => this.changeName(name)}
                        keyboardType={'default'}
                    />

                    <TextInput
                        placeholder={'Email Address'}
                        value={this.state.email}
                        onChangeText={email => this.changeEmail(email)}
                        keyboardType={'email-address'}
                    />

                    <TextInput
                        placeholder={'Phone Number'}
                        value={this.state.phoneNumber}
                        onChangeText={phone => this.changePhoneNumber(phone)}
                        keyboardType={'numeric'}
                    />

                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.openDatePicker()}
                        >
                        <View style={{height: 35, backgroundColor: 'silver', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
                            <Text>Date of Birth:</Text>
                            <Text>{`${this.state.dateOfBirth.getDate()}/${this.state.dateOfBirth.getMonth()}/${this.state.dateOfBirth.getFullYear()}`}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}