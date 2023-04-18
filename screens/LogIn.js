import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const LogIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.logIn}>
      <View style={styles.username}>
        <View style={[styles.usernameChild, styles.childShadowBox]} />
        <Text style={[styles.usernameOrEMail, styles.passwordTypo]}>
          Username or E-mail
        </Text>
      </View>
      <View style={styles.passowrd}>
        <View style={[styles.passowrdChild, styles.childShadowBox]} />
        <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
      </View>
      <Image
        style={styles.swngLogoTransparentCmyk11}
        resizeMode="cover"
        source={require("../assets/swng-logo-transparent-cmyk1-1.png")}
      />
      <Pressable
        style={styles.logIn1}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.logIn2}>{`Log In `}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  childShadowBox: {
    height: 46,
    shadowOpacity: 1,
    elevation: 18,
    shadowRadius: 18,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.09)",
    backgroundColor: Color.whitesmoke,
    borderRadius: Border.br_3xs,
    width: 321,
    position: "absolute",
  },
  passwordTypo: {
    height: 17,
    color: Color.darkgray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    top: 0,
    textAlign: "left",
    position: "absolute",
  },
  usernameChild: {
    top: 28,
    left: 0,
  },
  usernameOrEMail: {
    width: 130,
    left: 2,
  },
  username: {
    top: 286,
    left: 41,
    height: 74,
    width: 321,
    position: "absolute",
  },
  passowrdChild: {
    top: 22,
    left: 2,
  },
  password: {
    width: 67,
    left: 0,
  },
  passowrd: {
    top: 380,
    left: 43,
    width: 323,
    height: 68,
    position: "absolute",
  },
  swngLogoTransparentCmyk11: {
    top: 117,
    left: 55,
    borderRadius: Border.br_23xl,
    width: 295,
    height: 128,
    position: "absolute",
  },
  logIn2: {
    top: 15,
    left: 113,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.robotoBold,
    color: Color.white,
    width: 269,
    height: 39,
    textAlign: "left",
    position: "absolute",
  },
  logIn1: {
    top: 502,
    left: 49,
    backgroundColor: Color.firebrick,
    width: 301,
    height: 54,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  logIn: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 896,
    overflow: "hidden",
  },
});

export default LogIn;
