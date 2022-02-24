import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { t } from "react-native-tailwindcss";
import { removeHelp, setHelp } from "../api/user";
import { db } from "../auth/firebase.config";

const Home = () => {
  const [emergencyState, setEmergencyState] = useState(0);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [macAddress, setMacAddress] = useState("");
  const docId = useRef<string>("");
  const unsubscriber = useRef<Unsubscribe>();

  const handleHelp = async () => {
    docId.current = await setHelp();

    unsubscriber.current = onSnapshot(
      doc(db, "emergency", docId.current),
      (d: any) => {
        console.log(d.data());
        const data = d.data();
        if (data && !data.supportComing) {
          setEmergencyState(1);
          setEmergencyMessage("Hai inviato la richiesta di soccorso");
        } else if (data && data.supportComing) {
          setEmergencyState(2);
          setEmergencyMessage("I soccorsi stanno arrivando");
        }
      }
    );
  };

  const handleRemove = async () => {
    removeHelp(docId.current);
    setEmergencyState(0);
  };

  return (
    <View>
      <Text>Sick</Text>

      {emergencyState ? (
        <View>
          <Text style={[t.textCenter]}>{emergencyMessage}</Text>
          <ActivityIndicator size="large" color="#00ff00" />
          <Button title={"CANCEL"} onPress={handleRemove} />
          <Button title={"Conferma il soccorso e dona dei LUMA"} />
        </View>
      ) : (
        <Button title={"NEED HELP"} style={[t.bgRed100]} onPress={handleHelp} />
      )}
    </View>
  );
};

export default Home;
