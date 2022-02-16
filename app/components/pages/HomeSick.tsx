import GifImage from "@lowkey/react-native-gif";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { t } from "react-native-tailwindcss";
import { db } from "../auth/firebase.config";
import { setHelp } from "../auth/firebaseUtils";

const Home = () => {
  const [emergencyState, setEmergencyState] = useState(0);
  const unsubscriber = useRef<Unsubscribe>();

  useEffect(() => {
    (async () => {
      // const { status } = await getBackgroundPermissionsAsync();
      // console.log("statutsaaaar", status);
      // const location = await getCurrentPositionAsync();
      // console.log(location);
    })();
  });

  const handleHelp = async () => {
    const id = await setHelp();

    unsubscriber.current = onSnapshot(doc(db, "emergency", id), (d) => {
      console.log(d.data());
      const data = d.data();
      if (data && !data.supportComing) setEmergencyState(1);
      else if (data && data.supportComing) {
        setEmergencyState(2);
        if (unsubscriber.current) unsubscriber.current();
      }
    });
  };

  return (
    <View>
      <Text>Sick</Text>
      <Button title={"NEED HELP"} style={[t.bgRed100]} onPress={handleHelp} />
      {emergencyState === 1 ? (
        <View>
          <Text>Hai inviato una richiesta di soccorso</Text>
          <GifImage
            source={{
              uri: "https://media4.giphy.com/media/rwQuLdbybuD6M/giphy.gif?cid=790b7611a56770066f7f9319ee4fcf107c511ea0a08515c4&rid=giphy.gif&ct=g",
            }}
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode={"cover"}
          />
        </View>
      ) : emergencyState === 2 ? (
        <Text>I soccorsi stanno arrivando</Text>
      ) : null}
    </View>
  );
};

export default Home;
