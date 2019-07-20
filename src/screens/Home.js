import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Avatar, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import User from '../../User'

import firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

export default class Home extends Component {

  static navigationOptions = {
    header: null
  }

  _logOut = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login')
  }

  state = {
    longitude: 0,
    latitude: 0,
    users: [],
    viewDetail: false,
  };

  handleView(){
      if(this.state.viewDetail == true){
        this.setState({viewDetail: false})
      }
      else{
        this.setState({viewDetail: true})
      }
  }

  componentWillMount = async() => {
    User.uid = await AsyncStorage.getItem('userUid');
    let dbRef = firebase.database().ref('users');
    dbRef.once('child_added', (val) =>{
        let person = val.val();
        person.userUid = val.key;

        if (person.userUid == User.uid){
            User.avatar = person.image
            User.name = person.name
            User.location = {
                latitude: person.location.latitude,
                longitude: person.location.longitude,
            }
            console.warn(person.image)
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
      "featureType": "poi.place_of_worship",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#dddd00"
        },
        {
          "visibility": "off"
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
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#5c5c5c"
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
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#979700"
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
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#4e4e4e"
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
    
    console.warn(User.avatar)
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: -7.7584436,
                    longitude: 110.3759749,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0121,
                }}
                enableZoomControl={true}
                showsUserLocation = {true}
                showsMyLocationButton = {true}
                zoomEnabled = {true}
                customMapStyle={this.mapStyle}
            >
                {this.state.users.map(marker => (
                    <Marker
                        coordinate={marker.location}
                        title={marker.name}
                        description={marker.email}
                    >
                        {/* <View>
                            <Image
                                style={{height:50, width:50}}
                                source={{ uri: 'https://cdn.vox-cdn.com/thumbor/wI3iu8sNbFJSQB4yMLsoPMNzIHU=/0x0:3368x3368/1200x800/filters:focal(1188x715:1726x1253)/cdn.vox-cdn.com/uploads/chorus_image/image/62994726/AJ_Finn_author_photo_color_photo_courtesy_of_the_author.0.jpg'}} 
                            />
                        </View> */}
                    </Marker>
                ))}
            </MapView>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => this.handleView()}
                >
                    <Avatar
                        rounded
                        size="medium"
                        source={{
                            uri: User.avatar || 'https://cdn.iconscout.com/icon/free/png-256/user-avatar-contact-portfolio-personal-portrait-profile-1-5182.png',
                        }}
                    />
                </TouchableOpacity>
            </View>
                { (this.state.viewDetail == true) ?
                    <View style={styles.detail}>
                        <View style={styles.detailHeader}>
                            <TouchableOpacity
                                style={{position:'absolute', right:0, padding:5}}
                                onPress={() => this.handleView()}
                            >
                                <Icon
                                    name='close'
                                    size={30}
                                    color='rgba(0, 61, 61, 0.99)'
                                />
                            </TouchableOpacity>
                            <Avatar
                                containerStyle={{ left:30, top:55, opacity:10}}
                                rounded
                                size="large"
                                source={{
                                    uri: User.avatar || 'https://cdn.iconscout.com/icon/free/png-256/user-avatar-contact-portfolio-personal-portrait-profile-1-5182.png',
                                }}
                            />
                            <View style={{ left:120, top:5 }}>
                                <Text style={{fontSize:20, color:'rgba(237, 74, 74, 1)', fontWeight:'200'}}>ilham Yoga P.</Text>
                                <Text style={{fontSize:13, color:'rgba(21, 98, 121, 0.92)'}}>ilhamyogha@gmail.com</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.detailBody}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <View style={{elevation:5, borderRadius:50, height:50, width:50, justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff'}}>
                                    <Icon
                                        name='call'
                                        size={32}
                                        color='rgba(172, 168, 245, 1)'
                                    />
                                </View>
                                <Text style={{fontSize:15, color:'blue'}}>School</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{elevation:5, borderRadius:50, height:50, width:50, justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff'}}>
                                    <Icon
                                        name='school'
                                        size={32}
                                        color='rgba(172, 168, 245, 1)'
                                    />
                                </View>
                                <Text style={{fontSize:10, color:'blue'}}>School</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{elevation:5, borderRadius:50, height:50, width:50, justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff'}}>
                                    <Icon
                                        name='school'
                                        size={32}
                                        color='rgba(172, 168, 245, 1)'
                                    />
                                </View>
                                <Text style={{fontSize:10, color:'blue'}}>School</Text>
                            </View>
                        </ScrollView>
                    </View>
                    : null
                }
            <View style={styles.footer}>
                <View style={{right:25, flex:1}}>
                    <Button
                        buttonStyle={{borderRadius:20, width:'90%'}}
                        icon={
                            <Icon
                                style={{marginRight:10}}
                                name="contacts"
                                size={27}
                                color="white"
                            />
                        }
                        title="PEOPLE"
                        onPress={()=> this.props.navigation.navigate('friendList')}
                    />
                </View>
                <View style={{left:50, flex:1}}>
                    <Button
                        buttonStyle={{borderRadius:20, width:'90%'}}
                        icon={
                            <Icon
                                style={{marginRight:10,}}
                                name="forum"
                                size={27}
                                color="white"
                            />
                        }
                        title="CHAT"
                        onPress={()=> this.props.navigation.navigate('Chat')}
                    />
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
    },

    image: {
        height: 60,
        width: 60,
    },

    header:{
        position:'absolute',
        left: 20,
        top: 55,
        flexDirection: 'row',  
    },

    footer:{
        flex:1,
        position:'absolute',
        bottom: 25,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',  
    },

    detail:{
        height:'60%',
        marginTop: 140,
        marginHorizontal: 30,
        backgroundColor: '#fff',
        elevation:5,
        borderRadius:10,
    },

    detailHeader:{
        height:140,
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