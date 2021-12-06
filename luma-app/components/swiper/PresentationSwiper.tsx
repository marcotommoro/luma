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
import { GRANDFATHER, HEART } from "../utils/images";

type Props = {
  title: string;
  image: ImageSourcePropType;
  text: string;
};

// export const SwiperItem = ({ title, text, image }: Props) => {
//   useEffect(() => {
//     console.log("ciao", title, text, image);
//   }, []);
//   return (
//     <View
//       testID={title}
//       style={[t.flex, t.justifyCenter, t.flex1, t.itemsCenter]}
//     >
//       <Image style={[t.flex1, t.resizeContain]} source={image} />
//       <View style={[t.flex1]}>
//         <Text style={[t.textGreenblue, t.text3xl, t.fontBold, t.textCenter]}>
//           {title}
//         </Text>
//         <Text style={[t.textGreenblue, t.text3xl, t.fontBold]}>{text}</Text>
//       </View>
//     </View>
//   );
// };

export const PresentationSwiper = ({ navigation }: NavigationType) => {
  useEffect(() => {
    console.log("Heart", HEART, typeof HEART);
  }, []);

  const data = [
    { title: "Title", image: HEART, text: "Figa questo è l'abstract" },
    { title: "Title2", image: GRANDFATHER, text: "Figa questo è l'abstract" },
    { title: "Title3", image: HEART, text: "Figa questo è l'abstract" },
  ];

  return (
    <Swiper loop={false} style={[t.flex]} activeDotColor={color.greenblue}>
      {data.map((e, i) => {
        return (
          <View
            key={`${e.title}-${i}`}
            testID={e.title}
            style={[t.flex, t.justifyCenter, t.flex1, t.itemsCenter]}
          >
            <Image style={[t.flex1, t.resizeContain]} source={e.image} />
            <View style={[t.flex1]}>
              <Text
                style={[t.textGreenblue, t.text3xl, t.fontBold, t.textCenter]}
              >
                {e.title}
              </Text>
              <Text style={[t.textGreenblue, t.text3xl, t.fontBold]}>
                {e.text}
              </Text>

              {data.length - 1 === i ? (
                <View style={[t.justifyCenter, t.mT20, t.mX10]}>
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
