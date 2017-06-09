import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'EventsList'}),
  ]
})

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(resetAction);
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode={'contain'}
          source={require('../resources/images/welcome.png')}
          style={styles.logo}
        />
        <Text style={styles.message}>Welcome!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 25
  },
  message: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'green',
  },
})
