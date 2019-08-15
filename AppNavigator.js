import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  import {Icon} from 'react-native-vector-icons'
  import Home from './Home';
  import Friends from './Friends';

  const rootstack = createStackNavigator({
    Home: { 
        screen: Home ,
        },
    Friends: { 
        screen: Friends
        },
      },
      {
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
       }
  )
    // Map: {
    //     screen: Map,
    //     navigationOptions: {
    //       title: 'Map',
    //       headerStyle: {
    //         backgroundColor: '#16A085',
    //         barStyle: "light-content", // or directly
    //       },
    //       headerTintColor: '#fff',
    //       headerTitleStyle: {
    //         fontWeight: 'bold',
    //       },
    //       headerRight: (
    //         <View style={{
    //           flexDirection: "row-reverse",
    //           }}>
                
    //         <Button
    //          icon={<Icon name={'ios-menu'} size={25} color={'white'} 
    //           style={{
    //             paddingLeft: 5,
    //             paddingRight: 5,
    //           }}/>
    //         }
    //           onPress={() => alert('This is a button!')}
    //           type="clear"
    //         />
    //         <Button
    //          icon={<Icon name={'ios-person-add'} size={24} color={'white'}
    //           style={{
    //             paddingLeft: 5,
    //             paddingRight: 5,
    //           }}
    //         />}
    //           onPress={() => alert('This is a button!')}
    //           type="clear"
    //         />
    //         </View>
    //       ),
    //     },
    //   },
  
const AppNavigator = createAppContainer(rootstack);
  export default AppNavigator;