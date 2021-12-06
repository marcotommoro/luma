import React, { useContext, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "./auth/AuthProvider";
import { auth } from "./auth/firebase.config";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {
      console.log("1", auth.currentUser?.email);
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <View>
      <Text>CIao</Text>
      <Button onPress={handleSignOut} title="Sign Out" />
    </View>
  );
};

export default Home;
