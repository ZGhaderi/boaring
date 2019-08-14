import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class first extends Component {
    render() {
      return (
        <View>
          <Text>This is the first screen</Text>
          <Button onPress={() => this.props.navigation.navigate('secondScreen')} title="second"/>
        </View>
      )
    }
  };

