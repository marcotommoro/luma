import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import {} from "react-native-elements";
import { t } from "react-native-tailwindcss";
import { getUserInfo } from "../api/user";
import { auth } from "../auth/firebase.config";

const Profile = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<string>("");

  useEffect(() => {
    if (auth?.currentUser?.email)
      setDisplayName(auth.currentUser.email.split("@")[0]);

    getUserInfo()
      .then((info) => setUserInfo(info.role))
      .catch((e) => console.log("errore", e));
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <View>
      {!!displayName ? (
        <View style={[t.flex, t.flexCol, t.mT5]}>
          <Text style={[t.flex0, t.text2xl, t.textCenter]}>
            Hi! {"\n"}
            <Text style={[t.text3xl, t.uppercase, t.fontBold, t.flex1]}>
              {displayName}
            </Text>
          </Text>
          <Text style={[t.flex0, t.textCenter, t.text2xl, t.uppercase, t.mT1]}>
            sei un {userInfo}
          </Text>
        </View>
      ) : null}
      <Button onPress={handleSignOut} title="Sign Out" />
    </View>
  );
};

export default Profile;
