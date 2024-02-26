// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLUE, WHITE } from './screen/colors/Colors';
import LoginAndSignInScreen from './screen/LoginAndSignInScreen';
import LoginScreen from './screen/LoginScreen';
import SignInScreen from './screen/signIn/SignInScreen';
import SignInScreen1 from './screen/signIn/SignInScreen1';
import OTPScreen from './screen/signIn/OTPScreen';
import BirthDayAndSexScreen from './screen/signIn/BirthDayAndSexScreen';
import AvatarScreen from './screen/signIn/AvatarScreen';
import IndexScreen from './screen/home/IndexScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginAndSignIn"
        screenOptions={{
          headerStyle: { backgroundColor: BLUE },
          headerTitleStyle: { color: WHITE },
          headerTintColor: WHITE
        }}
      >
        <Stack.Screen
          name="LoginAndSignIn"
          component={LoginAndSignInScreen}
          options={({ navigation, route }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Đăng nhập"
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Tạo tài khoản"
          })}
        />
        <Stack.Screen
          name="SignIn1"
          component={SignInScreen1}
          options={({ navigation, route }) => ({
            headerTitle: "Tạo tài khoản"
          })}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Nhập mã kích hoạt"
          })}
        />
        <Stack.Screen
          name="BirthDayAndSexScreen"
          component={BirthDayAndSexScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Ngày sinh và giới tính"
          })}
        />
        <Stack.Screen
          name="AvatarScreen"
          component={AvatarScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Ảnh đại diện"
          })}
        />
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Index",
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

