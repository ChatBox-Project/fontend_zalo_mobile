import React from 'react'
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GetUserInformation, GetUserInformationById } from '../../api/SignInAPI';
import { getTokenAccess } from '../../store/MyStore';

function ChatSingle({ chatBox }) {
    // console.log(chatBox)
    // console.log(userInformation)

    const [userRecieverIformation, setUserReciverInformation] = React.useState({})


    React.useEffect(() => {
        const startGetUserReciverInformation = async () => {
            const tokenAccess = await getTokenAccess()
            const reqUserInformationNew = await GetUserInformation(tokenAccess)
            const userInformation = reqUserInformationNew.data.metadata.user
            var userReciever = (userInformation.id == chatBox.user1_id) ? chatBox.user2_id : chatBox.user1_id
            const reqUserReciever = await GetUserInformationById(userReciever, tokenAccess)
            setUserReciverInformation(reqUserReciever.data.metadata.user)
        }
        startGetUserReciverInformation()
    }, [])

    return (
        <View
            style={{
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderBottomWidth: 0.2,
                borderBottomColor: "#cccccc"
            }}>
            <Avatar
                size={60}
                rounded
                source={{ uri: userRecieverIformation.avatarUrl }}
            />
            <View style={{
                marginLeft: 15
            }}>
                <Text style={{ fontSize: 16, marginBottom: 3, fontWeight: '500' }}>{userRecieverIformation.name}</Text>
                <Text style={{ fontSize: 14, color: "gray" }}>Mai đi chơi nha</Text>
            </View>
        </View>
    )
}

export default ChatSingle