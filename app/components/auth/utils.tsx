import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { t } from "react-native-tailwindcss";
export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string) => {
  return String(password).match(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
};
const iconStyle = [t.bgWhite, t.p3, t.roundedFull, t.shadowLg];

export const SocialLogin = () => {
  return (
    <View style={[t.flex, t.flexRow, t.itemsCenter, t.justifyCenter, t.mT10]}>
      <TouchableWithoutFeedback style={iconStyle}>
        <AntDesign name="google" size={35} color="black" />
      </TouchableWithoutFeedback>
    </View>
  );
};
