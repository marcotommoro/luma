import { NavigationContainer } from "@react-navigation/native";
import "expo";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { LogBox, SafeAreaView } from "react-native";
import {} from "react-native-safe-area-context";
import { auth } from "./components/auth/firebase.config";
import { AuthRoutes, NonAuthRoutes } from "./components/routes";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs();

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
