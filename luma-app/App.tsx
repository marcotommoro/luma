import "expo";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View } from "react-native";
import { t } from "react-native-tailwindcss";
import { auth } from "./components/auth/firebase.config";
export default function App() {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    console.log("ciao");
    createUserWithEmailAndPassword(auth, "marco@ciao.it", "12345678")
      .then((userCredential) => {
        // Signed in
        const user1 = userCredential.user;
        console.log("CIoa", user, user1);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("erorre", errorCode, errorMessage);

        // ..
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text style={[t.text3xl, t.bgBlue800, t.textWhite, t.m10, t.p5]}>
        CIaoneeee
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
