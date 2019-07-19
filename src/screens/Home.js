import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Home extends Component {

  static navigationOptions = {
    header: null
  }

  _logOut = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login')
  }

  state = {
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

  render() {

    const { search } = this.state;

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
            >
            </MapView>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => this.handleView()}
                >
                    <Avatar
                        rounded
                        avatarStyle={{borderWidth:10}}
                        size="medium"
                        source={{
                            uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
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
                        </View>
                        <ScrollView style={styles.detailBody}>
                            <View style={{flexDirection:'row', borderWidth:2}}>
                                <Icon
                                    style={{elevation:2, borderRadius:10}}
                                    name='school'
                                    size={35}
                                    color='blue'
                                />
                                <Text style={{fontSize:10, color:'blue'}}>School</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Icon2
                                    style={{elevation:2, borderRadius:10}}
                                    name='school'
                                    size={35}
                                    color='blue'
                                />
                                <Text style={{fontSize:10, color:'blue'}}>Hobby</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Icon
                                    style={{elevation:2, borderRadius:10}}
                                    name='school'
                                    size={35}
                                    color='blue'
                                />
                                <Text style={{fontSize:10, color:'blue'}}>Phone number</Text>
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
                        title="CONTACT"
                        onPress={()=> this.props.navigation.navigate('Chat')}
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
        backgroundColor:'cyan',
    },

    image: {
        height: 60,
        width: 60,
    },

    header:{
        position:'absolute',
        right: 20,
        top: 20,
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
        margin: 15,
        flex:1,
        backgroundColor: '#fff',
        elevation:5,
        borderRadius:10,
    },

    detailHeader:{
        height:140,
        backgroundColor:'grey',
        elevation:2,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },

    detailBody:{
        flex: 1,
        backgroundColor:'white',
        paddingTop: 50,
        paddingHorizontal: 20,
    }
});