import React, { Component } from "react"
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from 'react-native-paper';
import firebase from 'firebase';
import User from '../../User';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true
        }
    }

    componentDidMount() {  
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) =>{
            let person = val.val()
                person.userUid = val.key;
            console.log('tes', person.userUid)
            console.log('tes2', User.uid._55)
            if (person.userUid === User.uid._55){
                User.name = person.name
                User.phone = person.phone
                User.email = person.email
                User.aboutMe = person.aboutMe
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
                        <View>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailProfile', item)}>
                                <View style={{alignItems:'center'}}>
                                    <View style={{width:'90%', backgroundColor:'#313133', padding:15, elevation:4, borderRadius:2, flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Avatar.Image size={65} source={{ uri: item.image }} />
                                        </View>
                                        <View style={{flex:3, marginLeft:10}}>
                                            <Text style={{color:'#fff', fontSize:20, lineHeight:26}}>                   
                                                {item.name} 
                                            </Text>
                                            <Text style={{color:'#fff', fontSize:13, lineHeight:26}}>                   
                                                {item.email} 
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{alignItems:'center', marginBottom:20}}>
                                <View style={{width:'90%', height:45, backgroundColor:'#313133', padding:5, elevation:4, borderRadius:2, flexDirection:'row'}}>
                                    <View style={{flex:1, alignItems:'center'}}>
                                        <TouchableOpacity>
                                            <Icon
                                                name='chat-bubble'
                                                size={28}
                                                color='rgb(137,188,102)'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1, alignItems:'center'}}>
                                        <TouchableOpacity>
                                            <Icon
                                                name='call'
                                                size={28}
                                                color='#fff'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                />
            </View>
        )
    }
}