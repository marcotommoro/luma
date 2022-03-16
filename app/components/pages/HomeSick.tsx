import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { t } from "react-native-tailwindcss";
import {
  donateLuma,
  getUserInfo,
  removeHelp,
  setHelp,
  startSendingDataLive,
  stopSendingDataLive,
  writeData,
} from "../api/user";
import { db } from "../auth/firebase.config";
import { disconnectBluethoot, readBluethootValue } from "../bluethoot";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [bpm, setBpm] = useState<number>(0);
  const [emergencyState, setEmergencyState] = useState(0);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [userData, setUserData] = useState();
  const [uidSupporter, setUidSupporter] = useState("");

  const docId = useRef<string>("");
  const timerIntervalId = useRef<any>();
  const unsubscriber = useRef<Unsubscribe>();

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) return;

    getUserInfo().then((ui) => setUserData(ui));

    onSnapshot(doc(getFirestore(), "users", uid), (d) => {
      if (!d.exists) return;

      if (d.data().isLive) {
        const v = Math.round(Math.random() * 100);
        startSendingDataLive(v);
      } else {
        stopSendingDataLive();
      }
    });
  }, []);

  useEffect(() => {
    setIsConnected(false);
    return () => {
      disconnectBluethoot();
    };
  }, []);

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
          setUidSupporter("");
        } else if (data && data.supportComing) {
          setEmergencyState(2);
          setEmergencyMessage(
            `I soccorsi stanno arrivando (${data.uidSupporter}).`
          );
          setUidSupporter(data.uidSupporter);
        }
      }
    );
  };

  const handleConnect = async () => {
    console.log("son dentro 1");
    timerIntervalId.current = setInterval(async () => {
      setIsConnected(true);
      const value = await readBluethootValue();
      console.log("son dentro 2");

      console.log("value", value);
      setBpm(value[0]);
      writeData(value[0]);
    }, 1000);
  };

  const handleDisconnect = () => {
    clearInterval(timerIntervalId.current);
    setTimeout(() => {
      console.log("disconnected");
      disconnectBluethoot();
      setBpm(0);
      setIsConnected(false);
    }, 1000);
  };

  const handleRemove = async () => {
    removeHelp(docId.current);
    setEmergencyState(0);
    setUidSupporter("");
  };

  const handleDonate = () => {
    handleRemove();
    donateLuma(uidSupporter, userData.quantity_luma);
  };

  return (
    <View>
      <View>
        {!isConnected ? (
          <View>
            <Button title="Connect" onPress={handleConnect} />
          </View>
        ) : (
          <View>
            <Text style={[t.textCenter, t.text4xl]}>{bpm} BPM</Text>
            <Button title="Disonnect" onPress={handleDisconnect} />
          </View>
        )}
      </View>

      {emergencyState ? (
        <View>
          <Text style={[t.textCenter]}>{emergencyMessage}</Text>
          <ActivityIndicator size="large" color="#00ff00" />
          <Button title={"CANCEL"} onPress={handleRemove} />
          {emergencyState === 2 ? (
            <Button
              title={`Conferma il soccorso e dona ${
                userData.quantity_luma / 2
              } LUMA`}
              onPress={handleDonate}
            />
          ) : null}
        </View>
      ) : (
        <Button title={"NEED HELP"} style={[t.bgRed100]} onPress={handleHelp} />
      )}
    </View>
  );
};

export default Home;
