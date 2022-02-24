import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button } from "react-native-elements";
import WebView from "react-native-webview";
import {
  connectBluethoot,
  disconnectBluethoot,
  readBluethootValue,
  startBluethootModule,
} from "../bluethoot/utils";

const Data = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [bpm, setBpm] = useState<number | null>(null);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setUid(getAuth().currentUser?.uid);
    console.log("uid", getAuth().currentUser?.uid);
  }, [getAuth().currentUser]);

  const handleConnect = async () => {
    await startBluethootModule();
    const res = await connectBluethoot();
    if (!res) return;

    setIsConnected(res);

    setInterval(async () => {
      const value = await readBluethootValue();
      console.log("value", value);
    }, 1000);
  };

  const handleDisconnect = () => {
    disconnectBluethoot();
    setBpm(null);
  };

  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <View>
        {!isConnected ? (
          <Button title="Connect" onPress={handleConnect} />
        ) : (
          <Button title="Disonnect" onPress={handleDisconnect} />
        )}
      </View>
      <WebView
        source={{
          uri: `https://luma.fly.dev/mobiledata?uid=${uid}`,
        }}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default Data;
