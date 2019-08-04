import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, IconButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import User from '../../User'

import firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

console.disableYellowBox = false;

export default class Home extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state = {
        longitude: 0,
        latitude: 0,
        myLocation:{
          latitude: 0,
          longitude: 0,
        },
        users: [],
    }
    User.uid = AsyncStorage.getItem('userUid');
  }

  _logOut = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login')
  }

  componentWillMount = async() => {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', (val) =>{
        let person = val.val();
        person.userUid = val.key;
        if (person.userUid === User.uid._55){
            User.image = person.image
            User.name = person.name
            User.email = person.email
            User.phone = person.phone
            this.setState({
              myLocation:{
                latitude: person.location.latitude,
                longitude: person.location.latitude,
              }
            })
            User.location.latitude = person.location.latitude
            User.location.longitude = person.location.longitude
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

  mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
  ]

  render() {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: Number(this.state.myLocation.latitude) || Number(User.location.latitude),
                    longitude: Number(this.state.myLocation.longitude) || Number(User.location.longitude),
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034,
                }}
                enableZoomControl={true}
                showsUserLocation = {true}
                zoomEnabled = {true}
                customMapStyle={this.mapStyle}
            >
                {this.state.users.map(marker => (
                    <Marker
                        coordinate={
                            {
                                latitude: marker.location.latitude,
                                longitude: marker.location.longitude,
                                latitudeDelta: 0.0043,
                                longitudeDelta: 0.0034
                            }
                        }
                        title={marker.name}
                        description={marker.email}
                    >
                    </Marker>
                ))}
            </MapView>
            <View style={styles.header}>
                <View style={{alignItems:'flex-start', width:55, marginLeft:5}}>
                    <Avatar.Image size={40} source={{uri:User.image}} style={{backgroundColor:'#636363'}}/>
                </View>
                <View style={{alignItems:'flex-start', flex:2}}>
                    <Text numberOfLines={1} style={{fontSize:18, color:'#fff'}}>{User.name}</Text>
                </View>
                <View style={{alignItems:'flex-end', flex:1, marginRight:5}}>
                    <Button mode="contained" style={{borderRadius:10}} color={'#636363'} onPress={() => this.props.navigation.navigate('DetailProfile', User)}>
                        View
                    </Button>
                </View>
            </View>
            <View style={{width:'87%', position:'absolute', height:55, bottom:200, alignItems:'flex-end'}}>
                <View style={{ width:55, height:55, alignItems:'center', justifyContent:'center', flex:1, backgroundColor:'rgba(26, 26, 26, 0.97)', borderRadius:50}}>
                    <IconButton
                        icon="my-location"
                        color='#636363'
                        size={24}
                        onPress={() => this.setState({
                          myLocation:{
                            latitude: User.location.latitude,
                            longitude: User.location.longitude
                          }
                        })}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{flex:1, alignItems:'center', borderBottomWidth:1, borderColor:'rgba(61, 61, 61, 1)'}}>
                    <TouchableOpacity 
                        style={{flex:1, width:'85%', marginRight:5, flexDirection:'row', alignItems:'center'}}
                        onPress={() => this.props.navigation.navigate('Chat')}
                    >
                        <Icon
                            name='bubbles'
                            size={32}
                            color='#2f7091'
                        />
                        <View style={{marginLeft:20}}>
                            <Text style={{color:'#2f7091', fontWeight:'bold', fontSize:18, marginBottom:3}}>Chat</Text>
                            <Text numberOfLines={1} style={{color:'#636363'}}>Chatting with friend</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, alignItems:'center'}}>
                    <TouchableOpacity 
                        style={{flex:1, width:'85%', marginRight:5, flexDirection:'row', alignItems:'center'}}
                        onPress={() => this.props.navigation.navigate('friendList')}
                    >
                        <Icon
                            name='people'
                            size={32}
                            color='#337857'
                        />
                        <View style={{marginLeft:20}}>
                            <Text style={{color:'#337857', fontWeight:'bold', fontSize:18, marginBottom:3}}>People</Text>
                            <Text numberOfLines={1} style={{color:'#636363'}}>Find people who use this application</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({

    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
    },

    container:{
        flex:1,
        backgroundColor:'#2e3745',
        alignItems:'center'
    },

    image: {
        height: 60,
        width: 60,
    },

    header:{
        flexDirection:'row',
        position:'absolute',
        borderRadius:25,
        top: 30,
        padding: 8,
        height: 55,
        width: '87%',
        backgroundColor: 'rgba(26, 26, 26, 0.97)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer:{
        flex:1,
        position:'absolute',
        bottom: 25,
        borderRadius:20,
        height: 160,
        width: '87%',
        backgroundColor: 'rgba(26, 26, 26, 0.90)',  
    },

    detail:{
        marginTop:50,
        height:'60%',
        marginHorizontal: 30,
        backgroundColor: '#fff',
        elevation:5,
        borderRadius:10,
    },

    detailHeader:{
        height:110,
        backgroundColor:'cyan',
        elevation:2,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },

    detailBody:{
        flex: 1,
        backgroundColor:'white',
        paddingTop: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    }
});