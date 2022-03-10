import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "expo";
import React, { useEffect, useState } from "react";
import {} from "react-native-safe-area-context";
import { colors } from "react-native-tailwindcss";
import { getUserInfo } from "./api/user";
import { Login } from "./auth/Login";
import { Signup } from "./auth/Signup";
import Crypto from "./pages/Crypto";
import Data from "./pages/Data";
import HomeCaregiver from "./pages/HomeCaregiver";
import HomeSick from "./pages/HomeSick";
import Profile from "./pages/Profile";
import PresentationSwiper from "./swiper/PresentationSwiper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthRoutes = () => {
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

export const NonAuthRoutes = () => (
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
