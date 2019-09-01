import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  import {Icon} from 'react-native-vector-icons'
  import Home from './Home';
  import Friends from './Friends';
  import mouse from './mouse';
  import elements from './elements';
  import drag from './drag';
  import packman from './packman'
  import games from './games'
  
  const rootstack = createStackNavigator({
    drag: { 
      screen: drag ,
      }, 
    Home: { 
        screen: Home ,
        },
    Friends: { 
        screen: Friends
        },
    mouse: { 
        screen: mouse
        },
    elements: {
        screen: elements
        }, 
    packman:{
        screen: packman,
        },
    games: {
        screen: games,
        },
           
      },
    
      // {
      //   navigationOptions: {
      //     headerVisible: false,
      //   }
      //  }
  )
  
const AppNavigator = createAppContainer(rootstack);
  export default AppNavigator;