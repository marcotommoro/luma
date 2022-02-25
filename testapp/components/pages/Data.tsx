import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
// import WebView from "react-native-webview";

const Data = () => {
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setUid(getAuth().currentUser?.uid);
  }, [getAuth().currentUser]);

  return (
    <View style={{ flex: 1 }}>
      {/* <WebView
        source={{
          uri: `https://lumaweb.fly.dev/mobiledata?uid=${uid}`,
        }}
        style={{
          flex: 1,
        }}
      /> */}
    </View>
  );
};

export default Data;
