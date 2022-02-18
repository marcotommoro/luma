import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  NativeEventEmitter,
  NativeModules,
  Text,
  View,
} from "react-native";
import BLManager from "react-native-ble-manager";
import { Button } from "react-native-elements";
import { t } from "react-native-tailwindcss";
import { removeHelp, setHelp } from "../api/user";
import { db } from "../auth/firebase.config";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = () => {
  const [emergencyState, setEmergencyState] = useState(0);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [macAddress, setMacAddress] = useState("");
  const docId = useRef<string>("");
  const unsubscriber = useRef<Unsubscribe>();

  useEffect(() => {
    if (!macAddress) return;

    BLManager.connect(macAddress).then(() => {
      console.log("Connected to ", macAddress);
    });

    let serviceId;
    BLManager.retrieveServices(macAddress).then((data) => {
      const { advertising } = data;
      serviceId = advertising.serviceUUIDs[0];
    });

    const timer = setInterval(() => {
      if (serviceId && macAddress) {
        console.log("serviceid", serviceId);
        BLManager.read(macAddress, serviceId, serviceId).then((value) => {
          console.log("value received", value);
          // IT WORKS
        });
      }
    }, 1000);
  }, [macAddress]);

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

  const handleDiscoverPeripheral = (peripheral: any) => {
    if (peripheral.name === "ECG/BPM Service" && !macAddress)
      setMacAddress(peripheral.id);
    BLManager.stopScan();
  };

  const handleConnect = async () => {
    BLManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initializeddddd");
    });

    bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral
    );

    BLManager.scan([], 5, false).then(() => {
      console.log("sto scannando");
    });
  };

  const handleDisconnect = () => {
    BLManager.disconnect(macAddress);
    setMacAddress("");
  };

  return (
    <View>
      <Text>Sick</Text>

      {!macAddress ? (
        <Button title={"Connetti bluetooth"} onPress={handleConnect} />
      ) : (
        <Button title={"Disconnetti bluetooth"} onPress={handleDisconnect} />
      )}

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
