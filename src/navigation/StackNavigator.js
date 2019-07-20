import { createStackNavigator, createAppContainer } from 'react-navigation';
import Auth from '../components/Auth'
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import friendList from '../screens/friendList';
import Chatting from '../components/Chatting';

const MyStackNavigator = createStackNavigator({
    Auth: {
        screen: Auth
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: Home
    },
    Chat: {
        screen: Chat
    },
    friendList: {
        screen: friendList
    },
    Chatting: {
        screen: Chatting
    },
},
    {
        initialRouteName: 'Auth'
    }
)
const HomeContainer = createAppContainer(MyStackNavigator)
export default HomeContainer