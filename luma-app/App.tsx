import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "expo";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {} from "react-native-safe-area-context";
import { auth } from "./components/auth/firebase.config";
import { Login, Signup } from "./components/auth/LoginSignup";
import Home from "./components/Home";
import PresentationSwiper from "./components/swiper/PresentationSwiper";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

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
