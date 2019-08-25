import React, { Component } from "react";
import {AppRegistry, Button, View , StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
    constructor(){
        super();
        this.state = { 
            elements: "",
        }
    }
    arrowKeys(){
        this.setState({elements: "arrowkey"});
        AsyncStorage.setItem('@element', this.state.elements);
        this.props.navigation.navigate('Friends');
    }
    accelerometer(){
        this.setState({elements: "accelerometer"});
        AsyncStorage.setItem('@element', this.state.elements);
        this.props.navigation.navigate('Friends');
    }
    render() {  
        return (   
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
                <TouchableOpacity style={styles.btn} onPress={() => this.accelerometer}>
                    <Text>Accelerometer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.arrowKeys}>
                    <Text>Arrow keys</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    cont1:{
      flex: 1,
     // backgroundColor: '#F5FCFF',//'#F5FCFF',
    },
})

AppRegistry.registerComponent('App',()=> App)