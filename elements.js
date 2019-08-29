import React, { Component } from "react";
import {AppRegistry, Button, View , StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
const {width: WIDTH} = Dimensions.get("window");
export default class App extends Component {
    constructor(){
        super();
        this.state = { 
            elements: "",
        }
    }
    arrowKeys=()=>{
        this.setState({elements: "arrowkey"});
        AsyncStorage.setItem('arrowKey', "true");
        AsyncStorage.setItem('accelerometer', "false");
        this.props.navigation.navigate('Friends');
    }
    accelerometer=()=>{
        this.setState({elements: "accelerometer"});
        AsyncStorage.setItem('accelerometer', "true");
        AsyncStorage.setItem('arrowKey', "false");
        this.props.navigation.navigate('Friends');
    }
    render() {  
        return (   
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
                    <Text style={{color: '#5bc0be',fontSize:25}}>Which one do you want to use?</Text>
                <TouchableOpacity style={styles.btn} onPress={this.accelerometer}>
                    <Text>Accelerometer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.arrowKeys}>
                    <Text>Arrow keys</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
    
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'startPage',
        headerStyle: {
          backgroundColor: '#6fffe9',
          barStyle: "light-content", // or directly
        },
        headerTintColor: '#0b132b',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
}

const styles=StyleSheet.create({
    cont1:{
      flex: 1,
     // backgroundColor: '#F5FCFF',//'#F5FCFF',
    },
    btn :{
        backgroundColor: '#5bc0be',//'#F7F9F9',
        color: '#7F8C8D',
        height : 45,
        width:WIDTH*(0.4),
        borderRadius: 8,
        marginTop:10,
        alignItems:"center",
        justifyContent: "center",
      },
})

AppRegistry.registerComponent('App',()=> App)