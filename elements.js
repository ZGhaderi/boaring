import React, { Component } from "react";
import {AppRegistry, Button, View , StyleSheet, ImageBackground,Image, Dimensions , Alert,TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
const {width: WIDTH} = Dimensions.get("window");
export default class App extends Component {
    constructor(){
        super();
        this.state = { 
            elements: "",
            game:'',
        }
    }
    async componentDidMount(){
        console.disableYellowBox = true;
        this.setState({game:String(await AsyncStorage.getItem('game'))});
    }
    arrowKeys=()=>{
        this.setState({elements: "arrowkey"});
        AsyncStorage.setItem('arrowKey', "true");
        AsyncStorage.setItem('accelerometer', "false");
        if(this.state.game== "packman"){
            this.props.navigation.navigate('packman');
        }
        else if(this.state.game == "nfs"){
            this.props.navigation.navigate('nfs');
        }
        else if(this.state.game == "motorace"){
            this.props.navigation.navigate('motorace');
        }
        else if(this.state.game == "hillcar"){
            this.props.navigation.navigate('hillcar');
        }
        else if(this.state.game == "another"){
            this.props.navigation.navigate('Friends');
        }
    }
    accelerometer=()=>{
        this.setState({elements: "accelerometer"});
        AsyncStorage.setItem('accelerometer', "true");
        AsyncStorage.setItem('arrowKey', "false");
        if(this.state.game== "packman"){
            this.props.navigation.navigate('packman');
        }
        else if(this.state.game == "nfs"){
            this.props.navigation.navigate('nfs');
        }
        else if(this.state.game == "motorace"){
            this.props.navigation.navigate('motorace');
        }
        else if(this.state.game == "hillcar"){
            this.props.navigation.navigate('hillcar');
        }
        else if(this.state.game == "another"){
            this.props.navigation.navigate('Friends');
        }
    }
    render() {  
        return (   
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
                    <Text style={{color: '#5bc0be',fontSize:25}}>Do you want to use accelerometer?</Text>
                <TouchableOpacity style={styles.btn} onPress={this.accelerometer}>
                    <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.arrowKeys}>
                    <Text>No</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
    
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Setting',
        headerStyle: {
          backgroundColor: '#6fffe9',
          barStyle: "light-content", 
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
})

AppRegistry.registerComponent('App',()=> App)