import { NavigationContainer } from "@react-navigation/native";
import "expo";
import { getAuth, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { LogBox, SafeAreaView } from "react-native";
import {} from "react-native-safe-area-context";
import { auth, db } from "./components/auth/firebase.config";
import { AuthRoutes, NonAuthRoutes } from "./components/routes";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isSendingData, setIsSendingData] = useState(false);
  auth.onAuthStateChanged((_user) => {
    setUser(_user);
  });

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;

    if (!uid) return;

    onSnapshot(doc(db, "live", uid), (doc) => {
      try {
        const { active } = doc.data();
        if (active && isSendingData) return;
        if (active) {
          // Start bluethoot data if not connected and send data
          setIsSendingData(true);
        } else {
          setIsSendingData(false);
        }
      } catch (error) {}
    });
  });

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {!!user ? <AuthRoutes /> : <NonAuthRoutes />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
