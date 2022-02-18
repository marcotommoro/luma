import {} from "firebase/auth";
import { onSnapshot, Unsubscribe } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Linking, Platform, ScrollView, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { t } from "react-native-tailwindcss";
import {
  getEmergency,
  queryEmergency,
  setHelpingComing,
  setHelpingNotComing,
} from "../api/user";

const SingleHelpCard = (element: any) => (
  <View>
    <Text>Bellalioooo</Text>
    <Text>{element.uid}</Text>
  </View>
);

type PatientDataType = {
  latitude: string;
  longitude: string;
};

const Home = () => {
  const [listHelp, setListHelp] = useState({});
  const unsubscriber = useRef<Unsubscribe>();
  const [isActiveHelping, setIsActiveHelping] = useState("");
  const [patientData, setPatientData] = useState<PatientDataType | any>();

  const handleListen = async () => {
    const docs: object = await getEmergency();
    await setListHelp(docs);

    const unsubscribe = onSnapshot(queryEmergency(), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const { location, uid } = change.doc.data();
          const id = change.doc.id;

          const l = { ...listHelp, [id]: { location, uid } };
          setListHelp((obj) => ({ ...obj, [id]: { location, uid } }));
        }

        if (change.type === "removed") {
          const state = listHelp;
          const id = change.doc.id;
          setListHelp((obj) => ({ ...obj, [id]: undefined }));
        }
      });
    });
  };

  const handleHelping = (key: string, value: object) => {
    if (unsubscriber.current) unsubscriber.current();
    setIsActiveHelping(key);
    setHelpingComing(key);
    setPatientData(value);
  };

  const handleCancelHelping = async () => {
    setIsActiveHelping("");
    setListHelp({});
    await setHelpingNotComing(isActiveHelping);
    setPatientData(null);
    handleListen();
  };

  const handleMaps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });

    const latLng = `${patientData.latitude},${patientData.longitude}`;
    const label = "Brutta merda";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <View>
      {!isActiveHelping ? (
        <View>
          <Text>Caregivereees</Text>
          <Button title="AIUTA QUALCUNO" onPress={handleListen} />
          {Object.keys(listHelp).length === 0 ? (
            <Text>Al momento nessuno ha bisogno</Text>
          ) : (
            <ScrollView>
              {Object.entries(listHelp).map(([key, value]) => {
                let latitude = "",
                  longitude = "";

                if (value) {
                  latitude = value.location.latitude;
                  longitude = value.location.longitude;
                }
                return (
                  <View key={key}>
                    <Card key={key}>
                      <Text>{key}</Text>
                      <Text>
                        {latitude} {"  "}
                        {longitude}
                      </Text>
                      <Button
                        title={"Accetta e vai a salvarlo"}
                        onPress={() => handleHelping(key, value)}
                      />
                    </Card>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      ) : (
        <View style={[t.textCenter, t.alignCenter, t.flex, t.contentCenter]}>
          <Text style={[t.textCenter]}>Dai nando muoviti!</Text>
          <Text style={[t.textCenter]}>Il paziente sta morendo</Text>
          <Button title={"Apri posizione nelle mappe"} onPress={handleMaps} />
          <Button
            title={"Non posso più andare a salvare il tipo"}
            onPress={handleCancelHelping}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
