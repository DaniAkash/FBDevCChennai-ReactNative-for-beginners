import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  Platform,
  Button,
  Modal,
  Image,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
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
        this.setState({loading: true, error: false});
        setTimeout(() => {
            this.setState({loading: false, done: true});
        }, 3000);
    }
  }

  complete() {
    this.props.navigation.dispatch(backAction);
  }

  async openDatePicker() {

    if(Platform.OS === 'android') {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: this.state.dateOfBirth.setMonth(this.state.dateOfBirth.getMonth() - 1),
          maxDate: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState({dateOfBirth: new Date(year, month+1, day)});
        } else {
          this.state.dateOfBirth.setMonth(this.state.dateOfBirth.getMonth() + 1);
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    } else if (Platform.OS === 'ios') {
      // iOS Code here
    }
  }

  render() {
    return(
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={dismissKeyboard}>

        <View style={{flex: 1}}>

          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.loading}
            onRequestClose={() => {}}
            >
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../resources/images/loading.gif')}
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
            placeholder={'Your Name...'}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            underlineColorAndroid={this.state.error && !this.state.name?'red':'green'}
            ref={'_name'}
            onSubmitEditing={() => {
              this.refs._email.focus();
            }}
            returnKeyType={'next'}
          />

          <TextInput
            placeholder={'Your Email...'}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            underlineColorAndroid={this.state.error && !this.state.email?'red':'green'}
            keyboardType={'email-address'}
            ref={'_email'}
            onSubmitEditing={() => {
              this.refs._phoneNumber.focus();
            }}
            returnKeyType={'next'}
          />

          <TextInput
            placeholder={'Your Phone Number...'}
            value={this.state.phoneNumber}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            underlineColorAndroid={this.state.error && !this.state.phoneNumber?'red':'green'}
            keyboardType={'numeric'}
            ref={'_phoneNumber'}
            onSubmitEditing={() => {
              this.openDatePicker();
            }}
            returnKeyType={'next'}
          />

          <TouchableHighlight
            underlayColor={'transparent'}
            style={{height: 50}}
            onPress={() => this.openDatePicker()}
            >
              <View style={{height: 35, backgroundColor: 'silver', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
                  <Text>Date of Birth:</Text>
                  <Text>{`${this.state.dateOfBirth.getDate()}/${this.state.dateOfBirth.getMonth()}/${this.state.dateOfBirth.getFullYear()}`}</Text>
              </View>
          </TouchableHighlight>

          <View style={{height: 25, width: 200, alignSelf: 'center', marginVertical: 20}}>
            <Button
              onPress={()=> this.submit()}
              title="Register"
              color="#841584"
            />
          </View>

          </View>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}
