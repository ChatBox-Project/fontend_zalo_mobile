import React from 'react'
import { Button, StyleSheet, View } from 'react-native';
import { GRAY } from '../../screen/colors/Colors';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet, ListItem } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { getTokenAccess } from '../../store/MyStore';
import { CreateMessage, GetAllMessage } from '../../api/ChatBoxAPI';

function ChatWindow({ navigation, route }) {

    // console.log(route.params)
    const chatBox = route.params.chatBox
    // console.log(chatBox.id)

    const [image, setImage] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        getTokenAccess()
            .then(tokenAccess => {
                GetAllMessage(chatBox.id, tokenAccess)
                    .then(messages => {
                        setMessages(convertFormartMessage(messages.data))
                        console.log("get all message success")
                        // console.log(messages.data)
                    }).catch(err => {
                        console.log(err)
                    })
            })
    }, [])

    function convertFormartMessage(messages) {
        return messages.map(message => {
            return {
                _id: message.id,
                text: message.contentMessage,
                createdAt: message.createDateTime,
                user: {
                    _id: message.senderId,
                    name: 'React Native',
                    avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg',
                },
            }
        })
    }

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const list = [
        {
            title: 'Gửi File',
            onPress: () => pickImage(),
        },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "Ngô Thiên Phú"
        });
    }, [])


    function createMessage(message) {

        const messageSend = {
            "messageType": "string",
            "contentMessage": message
        }

        getTokenAccess()
            .then(tokenAccess => {
                CreateMessage(chatBox.id, tokenAccess, messageSend)
                    .then(req => {
                        console.log("send ok !")
                        // console.log(req)
                    }).catch(err => {
                        console.log(err)
                    })
            })
    }


    return (
        <View style={styles.container} >
            <GiftedChat
                messages={messages}
                onSend={
                    (messages) => {
                        console.log(messages)
                        onSend(messages)
                        createMessage(messages[0].text)
                    }
                }
                user={{
                    _id: chatBox.sender_id,
                }}
            />
            <Button
                title='Tùy chọn'
                onPress={() => { setIsVisible(true) }}
            />
            <BottomSheet modalProps={{}} isVisible={isVisible}>
                {list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={l.containerStyle}
                        onPress={l.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

export default ChatWindow