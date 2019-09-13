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
    /**
     * <View style = {styles.mainContainer} >
            <View style={styles.cont2}>
                <View style={styles.firstFlex}>
                <Text style={{color: '#5bc0be',fontSize:25}}>Select game you want to play.</Text>
                <TouchableOpacity style={styles.btn} onPress={this.another}>
                <Text style={{color: '#5bc0be',fontSize:25}}>Another game</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.firstFlex}>
                    <View style={styles.colFlex}>
                    <View style={styles.btnCTRLview}>
                        <TouchableOpacity style={styles.btn} onPress={this.hillCar}>
                        <Image source={require("./image/hillcar.png")} style={styles.btnCTRLimage}></Image>
                        </TouchableOpacity>
                    </View>
                    </View>
                    <View style={styles.colFlex}>
                    <View style={styles.btnCTRLview}>
                        <TouchableOpacity style={styles.btn} onPress={this.motorace}>
                        <Image source={require("./image/motorace.jpg")} style={styles.btnCTRLimage}></Image>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                <View style={styles.firstFlex}>
                <View style={styles.colFlex}>
                    <View style={styles.btnCTRLview}>
                        <TouchableOpacity style={styles.btn} onPress={this.pacman}>
                        <Image source={require("./image/pac-man.jpg")} style={styles.btnCTRLimage}></Image>
                        </TouchableOpacity>
                    </View>
                    </View>
                <View style={styles.colFlex}>
                    <View style={styles.btnCTRLview}>
                        <TouchableOpacity style={styles.btn} onPress={this.nfs}>
                        <Image source={require("./image/nfs.jpg")} style={styles.btnCTRLimage}></Image>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    
            </View>   
      </View>
     */
    /* <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
                    <Text style={{color: '#5bc0be',fontSize:25}}>Select game you want to play.</Text>
                <TouchableOpacity style={styles.btn} onPress={this.pacman}>
                    <Image source={require("./image/pac-man.jpg")} style={styles.btnCTRLimage}></Image>
                </TouchableOpacity>
                
                </View>
            </View>*/
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
      //backgroundColor: '#F5FCFF',//'#F5FCFF',
      },
      
  btnCTRLview:{
    flex:1,
    justifyContent:"center",
    
  },
})

AppRegistry.registerComponent('App',()=> App)