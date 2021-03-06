import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  
  import Home from './Home';
  import Friends from './Friends';
  import mouse from './mouse';
  import elements from './elements';
  import drag from './drag';
  import packman from './packman'
  import games from './games'
  import motorace from'./motorace'
  import hillcar from'./hillcar'
  import nfs from'./nfs'

  const rootstack = createStackNavigator({    
    Home: { 
      screen: Home ,
      },   
    drag: { 
      screen: drag ,
      }, 
    mouse: { 
      screen: mouse
      },
    games: {
      screen: games,
      },
    Friends: { 
        screen: Friends
        },
    elements: {
        screen: elements
        }, 
    packman:{
        screen: packman,
        },
    motorace:{
      screen: motorace,
        },
    hillcar:{
      screen: hillcar,
        },
    nfs:{
      screen: nfs,
        },
    
    
  
           
      },
    
  )
  
const AppNavigator = createAppContainer(rootstack);
  export default AppNavigator;