import React from 'react';
import { StyleSheet, Text, View, Dimensions ,TouchableOpacity,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Akira } from 'react-native-textinput-effects';
import Icon from "react-native-vector-icons/Ionicons";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const {width: WIDTH} = Dimensions.get("window");
var empty = true;
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          data_in: "",
        };
      }
    
    componentDidMount(){
      console.disableYellowBox = true;
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backtoPrevScreen); 
    }
    componentWillUnmount() {
      this.backHandler.remove();
      this.socket.emit("chat message" ,"close");
      AsyncStorage.setItem('@storage_Key', " ");
    }

    _menu = null;

    setMenuRef = ref => {
      this._menu = ref;
    };
    backtoPrevScreen=()=>{
      this.socket.emit("chat message" ,"close");
      AsyncStorage.setItem('@storage_Key', " ");
      this.props.navigation.navigate('Home');
      return true;
    }
    isEmpty=()=>{
      if(this.state.data_in != ''){
        empty = false;
      }
      else{
        empty = true;
      }
    }
    submit=()=>{
      this.isEmpty();
      if(!empty){
        AsyncStorage.setItem('@storage_Key', this.state.data_in);
      }
      else{
        alert("Please Enter IP Address.")
      }
    }
    controller=()=>{
      if(!empty){
        this.props.navigation.navigate('games');
      }
      else{
        alert("Please Enter IP Address.")
      }
    }
    mouse=()=>{
      if(!empty){
        this.props.navigation.navigate('mouse');
      }
      else{
        alert("Please Enter IP Address.")
      }
    }
  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#0b132b'}}>
        <View style={{flex:1,flexDirection:"column",justifyContent:"center",width:300}}>
          <Akira
            label={'IP ADDRESS'}
            iconColor = 'white'
            borderColor={'#6fffe9'}
            inputPadding={16}
            inputStyle = {{color:'#6fffe9'}}
            labelHeight={24}  
            labelStyle={{ color: '#6fffe9' }}
            onChangeText={(data_in)=>this.setState({data_in})} 
            onSubmitEditing={this.submit}
            value={this.state.data_in}
          />
          <TouchableOpacity style={styles.btn} onPress={this.controller}>
            <Text>Game Controller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.mouse}>
            <Text>Desktop Controller</Text>
          </TouchableOpacity>
        </View>
      </View>
    );  
  }
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Home',
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      width:300,
      justifyContent: 'center',
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
      backgroundColor: '#5bc0be',
      color: '#7F8C8D',
      height : 45,
      width:WIDTH*(0.4),
      borderRadius: 8,
      marginTop:10,
      alignItems:"center",
      justifyContent: "center",
    },
      
  });
