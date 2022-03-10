import React, { useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { color, colors, t } from "react-native-tailwindcss";
import { GRANDFATHER, HEART, LOVE } from "../utils/images";

type Props = {
  title: string;
  image: ImageSourcePropType;
  text: string;
};

export const PresentationSwiper = ({ navigation }: NavigationType) => {
  useEffect(() => {
    console.log("Heart", HEART, typeof HEART);
  }, []);

  const data = [
    { title: "PREVENTION", image: HEART, text: "Important as the pussy" },
    {
      title: "MONITORING",
      image: GRANDFATHER,
      text: "Real Time Healt Status Monitoring System",
    },
    { title: "P2P HELP", image: LOVE, text: "Everyone can help" },
  ];

  return (
    <Swiper loop={false} style={[t.flex]} activeDotColor={color.greenblue}>
      {data.map((e, i) => {
        return (
          <View
            key={`${e.title}-${i}`}
            testID={e.title}
            style={[t.flex, t.justifyCenter, t.flex1, t.itemsCenter, t.mT10]}
          >
            <Image
              style={[
                t.flex1,
                t.resizeContain,
                { tintColor: "#22577A" },
                // t.p10,
              ]}
              source={e.image}
            />

            <View style={[t.flex1, t.mT10]}>
              <Text
                style={[t.textGreenblue, t.text5xl, t.fontBold, t.textCenter]}
              >
                {e.title}
              </Text>
              <Text
                style={[
                  t.textBlue500,
                  t.text3xl,
                  t.fontBold,
                  t.textCenter,
                  t.pT8,
                ]}
              >
                {e.text}
              </Text>

              {data.length - 1 === i ? (
                <View style={[t.justifyCenter, t.m8, t.mX10]}>
                  <TouchableHighlight
                    style={[
                      t.bgGreen,
                      t.pX10,
                      t.rounded,
                      t.roundedFull,
                      t.pY2,
                      t.mB5,
                      t.shadowLg,
                      t.bgWhite,
                    ]}
                    underlayColor={colors.white}
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  >
                    <Text
                      style={[t.text3xl, t.textGreen, t.fontBold, t.textCenter]}
                    >
                      Iscriviti
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      t.bgGreen,
                      t.pX10,
                      t.roundedFull,
                      t.pY2,
                      t.shadowLg,
                    ]}
                    underlayColor={colors.green}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text
                      style={[t.text3xl, t.textWhite, t.fontBold, t.textCenter]}
                    >
                      Login
                    </Text>
                  </TouchableHighlight>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </Swiper>
  );
};

// const styles = StyleSheet.create({
//   textButton: {
//     color: "white",
//   },
// });

export default PresentationSwiper;
