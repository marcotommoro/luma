import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "expo";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {} from "react-native-safe-area-context";
import { colors } from "react-native-tailwindcss";
import { getUserInfo } from "./components/api/user";
import { auth } from "./components/auth/firebase.config";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import Crypto from "./components/pages/Crypto";
import Data from "./components/pages/Data";
import HomeCaregiver from "./components/pages/HomeCaregiver";
import HomeSick from "./components/pages/HomeSick";
import Profile from "./components/pages/Profile";
import PresentationSwiper from "./components/swiper/PresentationSwiper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthRoutes = () => {
  const [isCaregiver, setIsCaregiver] = useState(false);

  useEffect(() => {
    getUserInfo().then((info) => setIsCaregiver(info.role === "caregiver"));
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      defaultScreenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      {isCaregiver ? (
        <Tab.Screen
          name="Home"
          component={HomeCaregiver}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                name={"home"}
                size={focused ? 40 : 30}
                color={focused ? colors.green : colors.blue500}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={HomeSick}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <AntDesign
                  name={"home"}
                  size={focused ? 40 : 30}
                  color={focused ? colors.green : colors.blue500}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Data"
            component={Data}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <AntDesign
                  name={"profile"}
                  size={focused ? 40 : 30}
                  color={focused ? colors.green : colors.blue500}
                />
              ),
              tabBarShowLabel: false,
            }}
          />
        </>
      )}

      <Tab.Screen
        name="Crypto"
        component={Crypto}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              name={"bitcoin"}
              size={focused ? 40 : 30}
              color={focused ? colors.green : colors.blue500}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name={"user"}
              size={focused ? 40 : 30}
              color={focused ? colors.green : colors.blue500}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

const NonAuthRoutes = () => (
  <Stack.Navigator initialRouteName="PresentationSwiper">
    <Stack.Screen
      options={{ headerShown: false }}
      name="Presentation"
      component={PresentationSwiper}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Signup"
      component={Signup}
    />
  </Stack.Navigator>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  auth.onAuthStateChanged((_user) => {
    setUser(_user);
  });

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {!!user ? <AuthRoutes /> : <NonAuthRoutes />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
