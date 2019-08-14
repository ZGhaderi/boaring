import React from 'react';
import { StyleSheet, Text, View, Button ,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          data_in: "",
        };
      }
    
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>Enter Ip Address: </Text>
          <TextInput 
        style={styles.input} 
        placeholder="data_in" 
        autoCorrect={false} 
        onChangeText={(data_in)=>this.setState({data_in})} 
        onSubmitEditing={() => AsyncStorage.setItem('@storage_Key', this.state.data_in)}
        value={this.state.data_in}
        />
        <Button
          title="SUBMIT"
          onPress={() => this.props.navigation.navigate('Friends')}
        />
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
  });