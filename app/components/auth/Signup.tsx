import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { color, t } from "react-native-tailwindcss";
import { firebaseSignupEmailPassword } from "./firebaseUtils";
import { SocialLogin, validateEmail, validatePassword } from "./utils";

type roleProps = {
  setRole: React.Dispatch<React.SetStateAction<string>>;
  role: string;
};
const ChooseRole = ({ role, setRole }: roleProps): JSX.Element => {
  const handleClick = (e: string) => {
    setRole(e);
  };

  return (
    <View style={[t.flex, t.itemsCenter, t.justifyBetween, t.mT10]}>
      <Text>Mi registro come</Text>
      <View style={[t.flex, t.flexRow, t.mT5]}>
        <TouchableWithoutFeedback
          style={[t.mR10, t.p5, t.shadow2xl]}
          onPress={() => handleClick("caregiver")}
        >
          <FontAwesome5
            name="user-nurse"
            size={100 + (role === "caregiver" ? 20 : 0)}
            color={color.green}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={[t.p5, t.shadow2xl]}
          onPress={() => handleClick("sick")}
        >
          <FontAwesome
            name="user"
            size={100 + (role !== "caregiver" ? 20 : 0)}
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
  const [role, setRole] = useState<string>("caregiver");

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
    const error: FirebaseError | any = await firebaseSignupEmailPassword(
      email,
      password,
      role
    );

    if (error.code === "auth/email-already-in-use") {
      console.log("coglione");
      setError("L'email è gia in uso");
    }

    setSubmitDisabled(false);
  };

  return (
    <View style={[t.flex, t.itemsCenter]}>
      <ChooseRole setRole={setRole} role={role} />
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
