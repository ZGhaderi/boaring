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
    pacman=()=>{
        AsyncStorage.setItem('game', "packman");
        this.props.navigation.navigate('elements');
    }
    render() {  
        return (   
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
                    <Text style={{color: '#5bc0be',fontSize:25}}>Select game you want to play.</Text>
                <TouchableOpacity style={styles.btn} onPress={this.pacman}>
                    <Image source={require("./image/pac-man.jpg")} style={styles.btnCTRLimage}></Image>
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
        backgroundColor: '#0b132b',//'#F7F9F9',
        color: '#0b132b',
        // height : 200,
        // width:400,//WIDTH*(0.4),
        borderRadius: 8,
        //marginTop:10,
        alignItems:"center",
        justifyContent: "center",
      },
      btnCTRLimage:{
        height:150,
        width:300,
        resizeMode:"contain"
      },
})

AppRegistry.registerComponent('App',()=> App)