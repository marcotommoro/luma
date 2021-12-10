import React, { useContext } from "react";
import { Button, View } from "react-native";
import { AuthContext } from "../auth/AuthProvider";
import { auth } from "../auth/firebase.config";

const Data = () => {
  const authContext = useContext(AuthContext);

  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <View>
      <Button onPress={handleSignOut} title="Sign Out" />
    </View>
  );
};

export default Data;
