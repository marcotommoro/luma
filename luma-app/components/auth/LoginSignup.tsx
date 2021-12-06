import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { color, t } from "react-native-tailwindcss";
import { auth } from "./firebase.config";
import {
  firebaseLoginEmailPassword,
  firebaseSignupEmailPassword,
} from "./firebaseUtils";

const iconStyle = [t.bgWhite, t.p3, t.roundedFull, t.shadowLg];

const SocialLogin = () => {
  return (
    <View style={[t.flex, t.flexRow, t.itemsCenter, t.justifyCenter, t.mT10]}>
      <TouchableWithoutFeedback style={iconStyle}>
        <AntDesign name="google" size={35} color="black" />
      </TouchableWithoutFeedback>
    </View>
  );
};

const ChooseRole = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <View style={[t.flex, t.itemsCenter, t.justifyBetween, t.mT10]}>
      <Text>Mi registro come</Text>
      <View style={[t.flex, t.flexRow, t.mT5]}>
        <TouchableWithoutFeedback
          style={[t.mR10, t.p5, t.shadow2xl]}
          onPress={handleClick}
        >
          <FontAwesome5
            name="user-nurse"
            size={100 + (!selected ? 20 : 0)}
            color={color.green}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={[t.p5, t.shadow2xl]}
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

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<any>();

  useEffect(() => {
    console.log(auth.currentUser);
    return () => {};
  }, []);

  const handleSubmit = async () => {
    setSubmitDisabled(true);
    console.log("validatePassword(password)", validatePassword(password));
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      password !== password2
    ) {
      setError("Controlla i dati immessi! Non sono corretti!");
      return;
    }
    console.log("controlli passati");
    const error = await firebaseSignupEmailPassword(email, password);
    !!error && setError(error);

    setSubmitDisabled(false);
  };

  return (
    <View style={[t.flex, t.itemsCenter]}>
      <ChooseRole />
      <SocialLogin />
      <Text style={[t.textSm, t.mY2, t.textGray800]}>oppure</Text>
      <View style={[t.wFull, t.pX10]}>
        {!!error ? (
          <Text style={[t.textRed600, t.textLg, t.p3, t.bgRed200, t.mB5]}>
            {error}
          </Text>
        ) : null}
        <Input
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
          leftIcon={<AntDesign name="user" size={24} color="black" />}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
          leftIcon={<AntDesign name="lock" size={24} color="black" />}
        />
        <Input
          secureTextEntry={true}
          onChangeText={(e) => setPassword2(e)}
          placeholder="Ripeti password"
          leftIcon={<AntDesign name="lock" size={24} color="black" />}
        />
        <Button
          buttonStyle={[t.bgBlue500]}
          title={"Registrati"}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>();

  const handleSubmit = async () => {
    setSubmitDisabled(true);
    console.log("validatePassword(password)", validatePassword(password));
    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Controlla i dati immessi che non sono corretti!");
      return;
    }
    const error = await firebaseLoginEmailPassword(email, password);
    console.log("errror", typeof error, error);
    !!error && setError(error);

    setSubmitDisabled(false);
  };

  return (
    <View style={[t.flex, t.itemsCenter]}>
      <Text style={[t.text3xl, t.mT5]}>Bentornato</Text>
      <SocialLogin />
      <Text style={[t.textSm, t.mY10, t.textGray800]}>oppure</Text>

      <View style={[t.wFull, t.pX10]}>
        {!!error ? (
          <Text style={[t.textRed600, t.textLg, t.p3, t.bgRed200, t.mB5]}>
            {error}
          </Text>
        ) : null}
        <Input
          textContentType="emailAddress"
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
          leftIcon={<AntDesign name="user" size={24} color="black" />}
        />
        <Input
          textContentType="password"
          autoCompleteType="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(e) => setPassword(e)}
          leftIcon={<AntDesign name="lock" size={24} color="black" />}
        />
        <Button
          disabled={submitDisabled}
          onPress={handleSubmit}
          buttonStyle={[t.bgBlue500]}
          title={"Login"}
        />
        <Text
          style={[t.mT5, t.textRight]}
          onPress={() => navigation.navigate("Signup")}
        >
          Non sei ancora registrato?
        </Text>
      </View>
    </View>
  );
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password: string) => {
  return String(password).match(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
};
