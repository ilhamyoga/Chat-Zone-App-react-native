import React from 'react';
import { TextInput, Text, View, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import User from '../../User';
import firebase from 'firebase';

export default class Chatting extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!'
  });

  constructor(props) {
    super(props);
    this.state = {
        person: {
          name: props.navigation.getParam('name'),
          email: props.navigation.getParam('email'),
          uid: props.navigation.getParam('userUid')
        },
        textMessage: '',
        messageList:[]
    }
  }

  componentWillMount(){
    console.log('User', User.uid)
    console.log('Child', this.state.person.uid)
    firebase.database().ref('messages').child(User.uid).child(this.state.person.uid)
      .on('child_added',(value)=>{
        this.setState((prevState)=>{
          return {
            messageList: [...prevState.messageList, value.val()]
          }
        })
      })
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  // get user() {
  //   return {
  //     name: this.props.navigation.state.params.name,
  //     email: this.props.navigation.state.params.email,
  //     avatar: this.props.navigation.state.params.avatar,
  //     id: firebaseSDK.uid,
  //     _id: firebaseSDK.uid
  //   };
  // }
  sendMessage = async () => {
    let msgId = firebase.database().ref('messages').child(User.uid).child(this.state.person.uid).push().key
    console.log('CEK',msgId)
    let updates  = {}
    let message = {
      message: this.state.textMessage,
      time: firebase.database.ServerValue.TIMESTAMP,
      from: this.state.person.uid
    }
    updates['messages/'+ User.uid + '/' + this.state.person.uid + '/' + msgId] = message 
    updates['messages/'+ this.state.person.uid + '/' + User.uid + '/' + msgId] = message 
    firebase.database().ref().update(updates);
    this.setState({ textMessage: '' });
  }

  renderRow = ({item}) => {
    return(
      <View style={{
        flexDirection:'row', 
        alignSelf: item.from===User.uid ? 'flex-start' : 'flex-end',
        backgroundColor: item.from===User.uid ? '#7cb342' : '#00897b',
        borderRadius: 5,
        marginBottom:10
      }}>
        <Text style={{color:'#fff', padding:7, fontSize:16}}>
          {item.message}
        </Text>
        <Text style={{color:'#eee'}}>
          {item.time}
        </Text>
      </View>
    )
  }

  render() {
    return (
      // <GiftedChat
      //   messages={this.state.messages}
      //   onSend={firebaseSDK.send}
      //   user={this.user}
      // />
      <View>
          <FlatList
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item,index)=>index.toString()}
          />
          <TextInput onChangeText={this.handleChange('textMessage')} value={this.state.textMessage}/>
          <TouchableOpacity onPress={this.sendMessage}>
            <Text>SEND</Text>
          </TouchableOpacity>
      </View>
    );
  }
}