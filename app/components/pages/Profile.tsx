import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import {} from "react-native-elements";
import { t } from "react-native-tailwindcss";
import { auth } from "../auth/firebase.config";

const Profile = () => {
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    if (auth.currentUser.email)
      setDisplayName(auth.currentUser.email.split("@")[0]);
  }, []);
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <View style={[t.flex, t.flexCol, t.mT5]}>
      {!!displayName ? (
        <Text style={[t.flex0, t.text2xl, t.textCenter]}>
          Hi! {"\n"}
          <Text style={[t.text3xl, t.uppercase, t.fontBold]}>
            {displayName}
          </Text>
        </Text>
      ) : null}
      <Button onPress={handleSignOut} title="Sign Out" />
    </View>
  );
};

export default Profile;
