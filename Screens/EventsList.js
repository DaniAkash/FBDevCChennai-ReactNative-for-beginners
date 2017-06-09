import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import eventList from '../data/events.js';

export default class EventsList extends Component {
  static navigationOptions = {
    title: 'Event List'
  }

  state = {
    refreshing: false,
  }

  _refreshList() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 3000)
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderRow(item, index) {
    return(
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('Registration', {name: item.event})}
        underlayColor="silver"
        >
        <View style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: index%2===0? 'white': '#F0FFF0'
          }}>
          <Text style={{marginBottom: 10}}>{item.event}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{item.location}</Text>
            <Text>{item.date}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeperator() {
    return(
      <View style={{backgroundColor: 'black', height: 0.5}}></View>
    );
  }

  render() {
    return(
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this._refreshList.bind(this)}
        data={eventList}
        keyExtractor={this._keyExtractor}
        renderItem={({item, index})=>this._renderRow(item, index)}
        ItemSeparatorComponent={this._renderSeperator}
      />
    )
  }
}
