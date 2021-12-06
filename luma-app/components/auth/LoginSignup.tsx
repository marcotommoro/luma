import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { color, t } from "react-native-tailwindcss";

const iconStyle = [t.bgWhite, t.p3, t.roundedFull, t.shadowLg];

const SocialLogin = () => {
  return (
    <View style={[t.flex, t.flexRow, t.itemsCenter, t.justifyCenter, t.mT10]}>
      <TouchableHighlight style={iconStyle}>
        <AntDesign name="google" size={35} color="black" />
      </TouchableHighlight>
    </View>
  );
};

const SwitchBetween = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mT10]}>
      <Text>Mi registro come</Text>
      <View style={[t.flex, t.flexRow, t.mT5]}>
        <TouchableHighlight
          style={[t.bgGray500, t.mR10, t.p5, t.shadow2xl]}
          onPress={handleClick}
        >
          <FontAwesome5
            name="user-nurse"
            size={100 + (!selected ? 20 : 0)}
            color={color.gray200}
          />
        </TouchableHighlight>

        <TouchableWithoutFeedback
          style={[t.bgGray200, t.p5, t.shadow2xl]}
          onPress={handleClick}
        >
          <FontAwesome
            name="user"
            size={100 + (selected ? 20 : 0)}
            color={color.greenblue}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
export const Login = () => {
  return (
    <View style={[t.flex, t.itemsCenter]}>
      <SwitchBetween />
      <SocialLogin />
      <Text style={[t.textSm, t.mY10, t.textGray800]}>oppure</Text>
      <View style={[t.wFull, t.pX10]}>
        <Input
          placeholder="Email"
          leftIcon={<AntDesign name="user" size={24} color="black" />}
        />
        <Input
          placeholder="Password"
          leftIcon={<AntDesign name="lock" size={24} color="black" />}
        />
        <Input
          placeholder="Ripeti password"
          leftIcon={<AntDesign name="lock" size={24} color="black" />}
        />
        <Button buttonStyle={[t.bgBlue500]} title={"Registrati"} />
      </View>
    </View>
  );
};

export const Signup = () => {
  return <View></View>;
};
