import React, { useEffect } from "react";
import { Text, View } from "react-native";

const AcceptedRequest = ({ emergencyId }: { emergencyId: string }) => {
  useEffect(() => {
    console.log(emergencyId);
  });
  return (
    <View>
      <Text>Accettata</Text>
    </View>
  );
};

export default AcceptedRequest;
