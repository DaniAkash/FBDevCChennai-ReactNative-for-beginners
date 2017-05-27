import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import events from '../data/events';

export default class EventsList extends Component {

    static navigationOptions = {
        title: 'Events List',
    };

    state = {
        events
    };

    _keyExtractor(item, index) {
        return item.id;
    }

    _renderRow(item) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                <View style={{height: 50, justifyContent: 'space-between'}}>
                    <Text>{item.event}</Text>
                    <Text>{item.location}</Text>
                </View>
                <View>
                    <Text>{item.date}</Text>
                </View>
            </View>
        );
    }

    _renderSeperator() {
        return(
            <View style={{backgroundColor: 'black', height: 1}}></View>
        )
    }

    render() {
        return(
            <View>
                <FlatList
                    data={events}
                    renderItem={({item}) => this._renderRow(item)}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this._renderSeperator}
                />
            </View>
        );
    }
}