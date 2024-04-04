import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { BLUE, GRAY } from './colors/Colors';
import { Login } from '../api/SignInAPI';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import { setAccount } from '../counter/counterSlice';

function LoginScreen({ navigation }) {

    const dispatch = useDispatch()
    const [accounts, setAccounts] = React.useState([])
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {

        }, [])
    );

    function validateInput() {
        const regexPhoneNumber = /^0[1-9][0-9]{8}$/
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        let checkPass = true

        if (!phoneNumber) {
            checkPass = false;
            setErrorPhoneNumber("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!phoneNumber.match(regexPhoneNumber)) {
            checkPass = false;
            setErrorPhoneNumber("SỐ ĐIỆN THOẠI KHÔNG HỢP LỆ")
        }

        if (!password) {
            checkPass = false;
            setErrorPassword("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!regexPassword.test(password)) {
            checkPass = false;
            setErrorPassword("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
        }

        return checkPass
    }

    function checkAccount() {
        setLoading(true)
        Login({ phoneNumber, password }).then(req => {
            navigation.push("Index")
            ressetInput()
            setLoading(false)
        }).catch(error => {
            setErrorPhoneNumber("SỐ ĐIỆN THOẠI HOẶC TÀI KHOẢN KHÔNG CHÍNH XÁC")
            ressetInput()
            setLoading(false)
        })
    }

    function ressetInput() {
        setPhoneNumber("")
        setPassword("")
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            </View>
            <View style={{ width: 370, marginTop: 15 }}>
                <Input
                    placeholder='Số điện thoại'
                    inputStyle={{ fontSize: 16 }}
                    onChangeText={setPhoneNumber}
                    onChange={() => {
                        if (errorPhoneNumber) {
                            setErrorPhoneNumber("")
                        }
                    }}
                    value={phoneNumber}
                    errorMessage={errorPhoneNumber}
                />
                <Input
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    inputStyle={{ fontSize: 16, marginTop: -5 }}
                    onChangeText={setPassword}
                    onChange={() => {
                        if (errorPassword) {
                            setErrorPassword("")
                        }
                    }}
                    value={password}
                    errorMessage={errorPassword}
                />
                <TouchableOpacity
                    style={{ marginTop: 10 }}
                >
                    <Text style={{ marginLeft: 10, color: BLUE, fontWeight: '500', marginTop: -10 }}>Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>
            <Button
                loading={loading}
                title={'Đăng nhập'}
                containerStyle={{
                    width: 360,
                }}
                buttonStyle={{
                    height: 40,
                    marginTop: 20,
                    backgroundColor: BLUE
                }}
                onPress={() => {
                    // if (validateInput()) {
                    //     checkAccount()
                    // }
                    navigation.push("Index")
                }}
            />
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

export default LoginScreen