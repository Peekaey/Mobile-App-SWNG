import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.home}>
      <Text style={styles.editProfile}>Edit Profile</Text>
      <Text style={styles.phoneNumber}>Phone Number</Text>
      <Image
        style={styles.arrowLeftIcon}
        resizeMode="cover"
        source={require("../assets/arrowleft.png")}
      />
      <Image
        style={styles.ushareAltIcon}
        resizeMode="cover"
        source={require("../assets/usharealt.png")}
      />
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
        style={[styles.homeChild, styles.homeChildPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Image
        style={[styles.homeChild, styles.homeChildPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Pressable
        style={[styles.messeage, styles.tickLayout]}
        onPress={() => navigation.navigate("RAP")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/messeage.png")}
        />
      </Pressable>
      <Image
        style={[styles.homeIcon, styles.starLayout]}
        resizeMode="cover"
        source={require("../assets/home-icon.png")}
      />
      <Pressable
        style={[styles.star, styles.starLayout]}
        onPress={() => navigation.navigate("RAP")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/star.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.tick, styles.tickLayout]}
        onPress={() => navigation.navigate("Attendence")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/tick.png")}
        />
      </Pressable>
      <Text
        style={[styles.upcomingEvent, styles.seeMoreTypo]}
      >{`Upcoming Event `}</Text>
      <Image
        style={[styles.homeInner, styles.homeInnerPosition]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.rectangleIcon, styles.homeInnerPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-43.png")}
      />
      <Image
        style={[styles.image1Icon, styles.homeChildPosition]}
        resizeMode="cover"
        source={require("../assets/image-1.png")}
      />
      <Text style={[styles.seeMore, styles.seeMoreTypo]}>{`See More `}</Text>
      <Image
        style={styles.unsplashjmurdhtm7ngIcon}
        resizeMode="cover"
        source={require("../assets/unsplashjmurdhtm7ng.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeChildPosition: {
    width: 414,
    left: 0,
    position: "absolute",
  },
  tickLayout: {
    height: 50,
    width: 50,
    top: 835,
    position: "absolute",
  },
  starLayout: {
    height: 58,
    width: 58,
    position: "absolute",
  },
  seeMoreTypo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: 19,
    color: Color.black,
    textAlign: "left",
    position: "absolute",
  },
  homeInnerPosition: {
    left: 31,
    position: "absolute",
  },
  editProfile: {
    left: 155,
    fontSize: FontSize.size_mini,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.white,
    textAlign: "left",
    top: 54,
    position: "absolute",
  },
  phoneNumber: {
    top: 462,
    left: 36,
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    display: "none",
    color: Color.black,
    textAlign: "left",
    position: "absolute",
  },
  arrowLeftIcon: {
    top: 50,
    left: 17,
    width: 26,
    height: 30,
    position: "absolute",
  },
  ushareAltIcon: {
    top: 47,
    left: 350,
    width: 21,
    height: 21,
    position: "absolute",
    overflow: "hidden",
  },
  swngLogoTransparentCmyk12: {
    left: 4,
    borderRadius: Border.br_23xl,
    width: 184,
    height: 84,
    top: 54,
    position: "absolute",
  },
  homeChild: {
    top: 831,
    height: 65,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  messeage: {
    left: 224,
  },
  homeIcon: {
    top: 837,
    left: 19,
  },
  star: {
    left: 115,
    top: 835,
    width: 58,
  },
  tick: {
    left: 330,
  },
  upcomingEvent: {
    top: 169,
    left: 106,
    width: 336,
    height: 57,
  },
  homeInner: {
    top: 206,
    width: 323,
    height: 3,
  },
  rectangleIcon: {
    top: 256,
    width: 337,
    height: 243,
  },
  image1Icon: {
    top: 677,
    height: 154,
  },
  seeMore: {
    top: 513,
    left: 276,
    width: 136,
    height: 61,
  },
  unsplashjmurdhtm7ngIcon: {
    top: 65,
    left: 316,
    width: 67,
    height: 68,
    position: "absolute",
  },
  home: {
    backgroundColor: Color.white,
    flex: 1,
    height: 896,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;
