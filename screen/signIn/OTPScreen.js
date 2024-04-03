import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { BLUE, GRAY } from '../colors/Colors';
import { verifyOTP } from '../../api/SignInAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';


function OTPScreen({ navigation }) {

    const [otp, setOTP] = React.useState("")
    const [time, setTime] = React.useState(30)
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        const id = setInterval(() => {
            if (time >= 0) {
                setTime(time - 1)
            }
        }, 1000);

        return () => {
            clearInterval(id)
        }
    }, [time])


    function ressetOTP() {
        // setOTP(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000)
        // setTime(30)
    }

    const runVerifyOTP = async () => {
        setLoading(true)
        try {
            const user = await AsyncStorage.getItem("userRegister");
            if (user !== null) {
                let userObj = JSON.parse(user)
                let phoneNumber = userObj.phoneNumber
                verifyOTP({ phoneNumber, otp }).then(req => {
                    alert("Xác thực thành công !")
                    navigation.push("SignIn")
                    setLoading(false)
                }).catch(err => {
                    console.error(err)
                    setLoading(false)
                })
            }
        } catch (e) {
            console.error(e)
            setLoading(false)
        }
    };


    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản</Text>
            </View>
            <View
                style={{
                    borderWidth: 3,
                    marginTop: 60,
                    marginBottom: 15,
                    borderRadius: 50,
                    width: 65,
                    height: 65,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: BLUE
                }}>
                <Icon name='phone-volume' size={30} color={BLUE} />
            </View>
            <Text style={{ fontWeight: '600', marginTop: 10, marginBottom: 5 }}>Đã gửi mã xác nhận đến số (+84) 9999 9999</Text>
            <Text>Vui lòng nhập mã xác nhận</Text>
            <View style={{ width: "35%", marginTop: 15 }}>
                <Input
                    placeholder='Nhập mã OTP'
                    inputStyle={{ fontSize: 16, textAlign: 'center' }}
                    value={otp}
                    onChangeText={setOTP}
                />
            </View>
            <View
                style={{ flexDirection: 'row' }}
            >
                {
                    (time >= 0) ?
                        <Text>Gửi lại mã</Text>
                        :
                        <TouchableOpacity
                            onPress={() => { ressetOTP() }}
                        >
                            <Text
                                style={{ color: BLUE }}
                            >Gửi lại mã
                            </Text>
                        </TouchableOpacity>
                }
                {
                    (time >= 0) ? <Text style={{ color: BLUE }}> {time}s</Text> : <></>
                }
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    loading={loading}
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                    onPress={() => { runVerifyOTP() }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default OTPScreen