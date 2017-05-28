import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  DatePickerAndroid,
  Button,
  Platform,
  Modal,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

const backAction = NavigationActions.back();

export default class RegistrationScreen extends Component {

    state = {
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: new Date(1990, 1, 1),
        error: false,
        loading: false,
        done: false,
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

    submit() {
        let each, loopBroken = false;
        let formValues = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        };
        for(each in formValues) {
            if(!formValues[each]) {
                this.setState({error: true});
                loopBroken = true;
                break;
            }
        }
        if(!loopBroken) {
            this.setState({loading: true});
            setTimeout(() => {
                this.setState({loading: false, done: true});
            }, 3000);
        }
    }

    complete() {
        this.setState({done: false});
        this.props.navigation.dispatch(backAction);
    }

    async openDatePicker() {
        if(Platform.OS === 'android') {

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
        else {
            // Code for iOS goes here...
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.loading}
                    onRequestClose={() => {}}
                    >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                        source={require('../resources/loading.gif')}
                        style={{height: 50, width: 50}}
                        resizeMode={'contain'}
                      />
                    </View>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.done}
                    onRequestClose={() => {}}
                    >
                    <View style={{flex: 1, backgroundColor: 'rgb(255,255,255)', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginBottom: 20, fontSize: 20, fontWeight: 'bold'}}>Event Successfully Registered!</Text>
                        <Button
                            onPress={() => this.complete()}
                            title="done"
                            color="green"
                        />                      
                    </View>
                </Modal>

                <Text style={{fontSize: 20, margin: 10}}>{this.props.navigation.state.params.name} Registration</Text>
                <View style={{flex: 1, margin: 10}}>
                    <TextInput
                        placeholder={'Your Name'}
                        ref={'_name'}
                        value={this.state.name}
                        onChangeText={name => this.changeName(name)}
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        underlineColorAndroid={this.state.error && !this.state.name? 'red':'green'}
                        onSubmitEditing={() => {
                            this.refs._email.focus();
                        }}
                    />

                    <TextInput
                        placeholder={'Email Address'}
                        ref={'_email'}
                        value={this.state.email}
                        onChangeText={email => this.changeEmail(email)}
                        keyboardType={'email-address'}
                        returnKeyType={'next'}
                        underlineColorAndroid={this.state.error && !this.state.email? 'red':'green'}
                        onSubmitEditing={() => {
                            this.refs._phone.focus();
                        }}
                    />

                    <TextInput
                        placeholder={'Phone Number'}
                        ref={'_phone'}
                        value={this.state.phoneNumber}
                        onChangeText={phone => this.changePhoneNumber(phone)}
                        keyboardType={'numeric'}
                        returnKeyType={'next'}
                        underlineColorAndroid={this.state.error && !this.state.phoneNumber? 'red':'green'}
                        onSubmitEditing={() => {
                            this.openDatePicker();
                        }}
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

                    <View style={{alignSelf: 'center'}}>
                        <Button
                            onPress={() => this.submit()}
                            title="Register"
                            color="#841584"
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}