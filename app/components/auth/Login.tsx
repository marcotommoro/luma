import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { t } from "react-native-tailwindcss";
import { firebaseLoginEmailPassword } from "./firebaseUtils";
import { SocialLogin, validateEmail, validatePassword } from "./utils";

export const Login = ({ navigation }: NavigationType) => {
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
    const e = await firebaseLoginEmailPassword(email, password);
    if (e) {
      setError(e);
    }

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
