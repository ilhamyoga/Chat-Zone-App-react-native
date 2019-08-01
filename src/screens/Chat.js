import React, { Component } from "react"
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from 'react-native-paper';
import firebase from 'firebase';
import User from '../../User';
import Icon from 'react-native-vector-icons/Octicons';

export default class Chat extends Component {

    static navigationOptions = {
        headerStyle:{
            backgroundColor: 'transparent',
        },
        titleStyle:{
            color :'#fff',
            alignItems: 'center'
        },
        headerTintColor:'#fff',
        headerTransparent: true,
        title: 'CHAT'
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true
        }
    }

    componentWillMount = async() => {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) =>{
            let person = val.val()
                person.userUid = val.key;
            if (person.userUid === User.uid._55){
                User.name = person.name
                User.phone = person.phone
                User.email = person.email
            }
            else{
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person],
                        isLoading: false
                    }
                })
            }
        })
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#19191e', paddingBottom:15, paddingTop:70}}>

                { (this.state.isLoading == true) ?
                    <View>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                    : null
                }

                <FlatList
                    data={this.state.users}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chatting', item)}>
                            <View style={{flexDirection:'row', marginBottom:13, backgroundColor:'#313133', paddingLeft:17, paddingVertical:13}}>
                                <View style={{flex:1}}>
                                    <Avatar.Image size={41} source={{ uri: item.image }} />
                                </View>
                                <View style={{marginLeft:15, flex:5}}>
                                    <Text numberOfLines={1} style={{fontWeight:'500', fontSize:19, color:'#e0e0e0'}}>
                                        {item.name}
                                    </Text>
                                    <Text numberOfLines={1} style={{color:'#8a8d91', fontSize:14}}>
                                        Yo, what about the lessons ?
                                    </Text>
                                </View>
                                <View style={{justifyContent:'center', alignItems:'flex-end', paddingLeft:10, marginRight:25, flex:1}}>
                                    <Icon
                                        name='primitive-dot'
                                        size={17}
                                        color='#3477aa'
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                />
            </View>
        )
    }
}