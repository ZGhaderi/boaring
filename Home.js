import React from 'react';
import { StyleSheet, Text, View, Button ,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Akira } from 'react-native-textinput-effects';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          data_in: "",
        };
      }
    /**
     * <TextInput style={styles.txtinput}
            style={styles.input} 
            placeholder="data_in" 
            autoCorrect={false} 
            onChangeText={(data_in)=>this.setState({data_in})} 
            onSubmitEditing={() => AsyncStorage.setItem('@storage_Key', this.state.data_in)}
            value={this.state.data_in}
        />
     */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter Ip Address: </Text>
        <Akira
          label={'IP ADDRESS'}
          borderColor={'#a5d1cc'}
          inputPadding={16}
          labelHeight={24}
          labelStyle={{ color: '#ac83c4' }}
          onChangeText={(data_in)=>this.setState({data_in})} 
          onSubmitEditing={() => AsyncStorage.setItem('@storage_Key', this.state.data_in)}
          value={this.state.data_in}
        />
        <Button style={styles.btn}
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
      backgroundColor: '#F5FCFF',
      
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    text: {
      textAlign: "center",
      lineHeight: 30,
      marginTop: 8,
      fontSize: 32,
      fontWeight: '400',
      color: '#333333'
      },
    txtinput: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
    },
    btn :{
      backgroundColor: '#7F8C8D',//'#F7F9F9',
      color: '#7F8C8D',
      //width: 0.5,
      borderRadius: 8,
    },
      
  });