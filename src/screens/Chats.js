import React, { Component } from "react"
import { View, Text } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const data = [
    {
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        nama: 'Ilham Yoga Pratama',
        lastMessage: 'Halo.. ilham..'
    },
    {
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        nama: 'Ilham Yoga Pratama',
        lastMessage: 'Halo.. ilham..'
    },
    {
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        nama: 'Ilham Yoga Pratama',
        lastMessage: 'Halo.. ilham..'
    },
]

export default class Chats extends Component {

    static navigationOptions = {
        title: 'CHATS'
    }

    constructor(props) {
        super(props);
        this.state = {
            data:data
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatDetails')}>
                            <View>
                                <View>
                                    <Text>
                                        {item.nama}
                                    </Text>
                                    <Text>
                                        {item.lastMessage}
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