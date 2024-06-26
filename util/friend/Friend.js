import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { BLUE } from '../../screen/colors/Colors';

function Friend({ friend, navigation }) {

    return (
        <TouchableOpacity
            onPress={() => { navigation.push("Personal") }}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 15,
                marginVertical: 12
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Avatar
                    size={60}
                    rounded
                    source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                />
                <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 15 }}>{friend?.username}</Text>
            </View>
            <View style={{ width: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20 }}>
                <TouchableOpacity style={{ opacity: 0.5 }}>
                    <Icon name='phone' size={20} color={"green"} />
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 0.5 }}>
                    <Icon1 name='videocam-outline' size={22} color={BLUE} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default Friend