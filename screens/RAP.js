import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Border } from "../GlobalStyles";

const RAP = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.rap}>
      <Image
        style={styles.swngLogoTransparentCmyk12}
        resizeMode="cover"
        source={require("../assets/swng-logo-transparent-cmyk1-2.png")}
      />
      <Image
        style={styles.swngLogoTransparentCmyk12}
        resizeMode="cover"
        source={require("../assets/swng-logo-transparent-cmyk1-2.png")}
      />
      <Image
        style={styles.rapChild}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Pressable
        style={[styles.chat, styles.chatLayout]}
        onPress={() => navigation.navigate("Ref")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/messeage.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.home, styles.chatLayout]}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/home-icon1.png")}
        />
      </Pressable>
      <Image
        style={[styles.starIcon, styles.chatLayout]}
        resizeMode="cover"
        source={require("../assets/star1.png")}
      />
      <Pressable
        style={[styles.tick1, styles.chatLayout]}
        onPress={() => navigation.navigate("Attendence")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/tick.png")}
        />
      </Pressable>
      <Text
        style={[styles.userRating, styles.userRatingTypo]}
      >{`User Rating `}</Text>
      <Image
        style={styles.rapItem}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={styles.image2Icon}
        resizeMode="cover"
        source={require("../assets/image-2.png")}
      />
      <Text
        style={[styles.writeAReview, styles.userRatingTypo]}
      >{`Write a review for the user `}</Text>
      <Image
        style={styles.rapInner}
        resizeMode="cover"
        source={require("../assets/rectangle-43.png")}
      />
      <Image
        style={styles.unsplashjmurdhtm7ngIcon}
        resizeMode="cover"
        source={require("../assets/unsplashjmurdhtm7ng.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatLayout: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  userRatingTypo: {
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: 19,
    left: 33,
    position: "absolute",
  },
  swngLogoTransparentCmyk12: {
    top: 54,
    left: 4,
    borderRadius: Border.br_23xl,
    width: 184,
    height: 84,
    position: "absolute",
  },
  rapChild: {
    top: 831,
    left: 0,
    width: 414,
    height: 65,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  chat: {
    left: 224,
    top: 835,
    width: 50,
  },
  home: {
    left: 23,
    top: 837,
  },
  starIcon: {
    left: 119,
    top: 835,
    width: 50,
  },
  tick1: {
    left: 330,
    top: 835,
    width: 50,
  },
  userRating: {
    top: 167,
    width: 336,
    height: 57,
  },
  rapItem: {
    top: 206,
    left: 31,
    width: 323,
    height: 3,
    position: "absolute",
  },
  image2Icon: {
    top: 137,
    left: 173,
    width: 160,
    height: 76,
    position: "absolute",
  },
  writeAReview: {
    top: 246,
    width: 339,
    height: 71,
  },
  rapInner: {
    top: 306,
    left: 29,
    width: 337,
    height: 243,
    position: "absolute",
  },
  unsplashjmurdhtm7ngIcon: {
    top: 50,
    left: 319,
    width: 67,
    height: 68,
    position: "absolute",
  },
  rap: {
    backgroundColor: Color.white,
    flex: 1,
    height: 896,
    overflow: "hidden",
    width: "100%",
  },
});

export default RAP;
