import React, { Component } from "react"
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import User from '../../User';

export default class Chat extends Component {

    static navigationOptions = {
        headerStyle:{
            backgroundColor: 'transparent',
        },
        titleStyle:{
            color :'#fff'
        },
        headerTintColor:'#fff',
        headerTransparent: true,
        title: 'PEOPLE'
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

    componentWillMount() {  
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) =>{
            let person = val.val()
                person.userUid = val.key;
            if (person.userUid === User.uid){
                User.name = person.name
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
            <View style={{flex:1, backgroundColor:'#2f2f3d', paddingLeft:10, paddingBottom:15, paddingTop:70}}>

                { (this.state.isLoading == true) ?
                    <View>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                    : null
                }

                {/* <TouchableOpacity onPress={this._logOut}>
                    <Text>Logout</Text>
                </TouchableOpacity> */}
                <FlatList
                    data={this.state.users}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chatting', item)}>
                            <View style={{flexDirection:'row', margin:10}}>
                                <Avatar
                                    rounded
                                    size="medium"
                                    source={{
                                        uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                                    }}
                                />
                                <View style={{marginLeft:10, borderBottomWidth:0.5, flex:1}}>
                                    <Text style={{fontWeight:'bold', fontSize:15}}>
                                        {item.name}
                                    </Text>
                                    <Text style={{color:'#8a8d91'}}>
                                        {item.messeage}
                                    </Text>
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