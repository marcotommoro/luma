import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { t } from "react-native-tailwindcss";
import { getUserInfo } from "../api/user";
import { auth } from "../auth/firebase.config";

const Crypto = () => {
  const [quantity, setQuantity] = useState(false);

  useEffect(() => {
    getUserInfo().then((info) => setQuantity(info.quantity_luma));
  });

  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <View style={[t.flex, t.flexCol, t.mT5]}>
      <Text style={[t.textCenter, t.text3xl, t.uppercase]}>complimenti!</Text>
      <Text style={[t.textCenter, t.text3xl, t.uppercase]}>hai guadagnato</Text>
      <Text style={[t.textCenter, t.text5xl, t.fontBold, t.uppercase]}>
        {quantity} LUMA
      </Text>
    </View>
  );
};

export default Crypto;
