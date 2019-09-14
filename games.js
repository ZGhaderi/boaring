import React, { Component } from "react";
import {AppRegistry, Button, View , StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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
    nfs=()=>{
        AsyncStorage.setItem('game', "nfs");
        this.props.navigation.navigate('elements');
    }
    hillCar=()=>{
        AsyncStorage.setItem('game', "hillcar");
        this.props.navigation.navigate('elements');
    }
    motorace=()=>{
        AsyncStorage.setItem('game', "motorace");
        this.props.navigation.navigate('elements');
    }
    another=()=>{
        AsyncStorage.setItem('game', "another");
        this.props.navigation.navigate('drag');
    }
    _menu = null;

  SsetMenuRef = ref => {
    this._menu = ref;
  };
    render() {  
        return (   
          <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
          <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
              <Text style={{color: '#5bc0be',fontSize:25}}>Select game you want to play.</Text>
          <TouchableOpacity style={styles.btn} onPress={this.nfs}>
              <Text>Need for Speed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.hillCar}>
              <Text>Hill Climb car</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.pacman}>
              <Text>Pac-man</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.motorace}>
              <Text>Moto Racing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.another}>
              <Text>Another Games</Text>
          </TouchableOpacity>
          </View>
          </View>
           
        )
    }

  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Choose Game',
        headerStyle: {
          backgroundColor: '#6fffe9',
          barStyle: "light-content", 
        },
        headerTintColor: '#0b132b',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
          <View style={{
            flexDirection: "row-reverse",
            }}>
            <Menu
                ref={(ref) => this._menu = ref}
                button={<TouchableOpacity onPress={() => this._menu.show()} 
                  style={{paddingHorizontal:16, height: '100%', alignItems:'center', 
                  justifyContent: 'center'}}>
                    <Icon name={'ios-menu'} size={25} color={'white'} 
                    style={{alignSelf:'center'}} resizeMode='contain'/></TouchableOpacity>}
            >
                <MenuItem onPress={() => {
                  this._menu.hide()     
                  navigation.navigate('Home')
                  }} textStyle={{color: '#000', fontSize: 16}}>Home</MenuItem>
                <MenuItem onPress={() => {
                  this._menu.hide()
                  }} textStyle={{fontSize: 16}} disabled>Game Controller</MenuItem>
                <MenuItem  onPress={() =>{
                  this._menu.hide()
                  navigation.navigate('mouse')
                  }} textStyle={{color: '#000',fontSize: 16}}>Desktop Controller</MenuItem>
                
            </Menu>
          </View>
        ),
      }
    }
}

const styles=StyleSheet.create({
    cont1:{
      flex: 1,
    },
    btn :{
      backgroundColor: '#5bc0be',
      color: '#7F8C8D',
      height : 45,
      width:WIDTH*(0.4),
      borderRadius: 8,
      marginTop:10,
      alignItems:"center",
      justifyContent: "center",
    },
      btnCTRLimage:{
        height:150,
        width:300,
        resizeMode:"contain"
      },
      mainContainer:{
        flex : 1,
        flexDirection:"row",
        backgroundColor:"#1c2541",
        justifyContent:"space-between",
        marginBottom:10
      },
      firstFlex:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
      },
      colFlex:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
      },
      cont2:{
        flex: 1,
      },
      
  btnCTRLview:{
    flex:1,
    justifyContent:"center",
    
  },
})

AppRegistry.registerComponent('App',()=> App)