
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, } from 'react-native';

import { Text, View } from '../components/Themed';

import * as React from "react";
import { Pressable } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, ParamListBase } from '@react-navigation/native';


export default function ReferralsPage() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


  return (
    <View style={styles.ref}>
      <Image
        style={styles.unsplashjmurdhtm7ngIcon}
        resizeMode="cover"
        source={require("../assets/unsplashjmurdhtm7ng.png")}
      />
      <Text style={styles.editProfile}>Edit Profile</Text>
      <Text style={styles.phoneNumber}>Phone Number</Text>
      <Text style={[styles.update, styles.updateTypo]}>Update</Text>
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
        style={[styles.refChild, styles.refLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Image
        style={[styles.icons8ChatMessage5022, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/messeage.png")}
      />
      <Image
        style={[styles.icons8Checkmark3222, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/tick.png")}
      />
      <Image
        style={[styles.icons8HomePage242, styles.rectanglePosition]}
        resizeMode="cover"
        source={require("../assets/home-icon1.png")}
      />
      <Image
        style={[styles.icons8Star5022, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/star1.png")}
      />
      <Image
        style={[styles.icons8ChatMessage5022, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/messeage.png")}
      />
      <Pressable
        style={[styles.icons8Checkmark3222, styles.icons8Layout]}
        onPress={() => navigation.navigate("Attendence")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/tick.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.icons8HomePage242, styles.rectanglePosition]}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/home-icon1.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.icons8Star5022, styles.icons8Layout]}
        onPress={() => navigation.navigate("RAP")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/star1.png")}
        />
      </Pressable>
      <Image
        style={[styles.refItem, styles.refLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Text style={[styles.referral, styles.referralTypo]}>{`Referral  `}</Text>
      <Image
        style={[styles.refInner, styles.refInnerPosition]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Text style={[styles.nameRequired, styles.emailTypo]}>
        Name( Required )
      </Text>
      <View style={[styles.rectangleView, styles.childLayout]} />
      <Text style={[styles.email, styles.emailPosition]}>Email</Text>
      <View style={styles.frameView}>
        <View style={[styles.frameChild, styles.childLayout]} />
      </View>
      <Text style={[styles.update1, styles.updateTypo]}>Update</Text>
      <Text style={[styles.notes, styles.notesPosition]}>Notes</Text>
      <View style={[styles.refChild1, styles.notesPosition]} />
      <Text style={[styles.phone, styles.emailPosition]}>Phone:</Text>
      <Image
        style={[styles.rectangleIcon, styles.childLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-48.png")}
      />
      <Text
        style={[styles.businessOrgnisation, styles.emailPosition]}
      >{`Business / Orgnisation `}</Text>
      <View style={[styles.refChild2, styles.emailPosition]} />
      <View style={[styles.sumbit, styles.sumbitLayout]}>
        <View style={[styles.sumbitChild, styles.sumbitLayout]} />
        <Text style={styles.submit}>submit</Text>
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  updateTypo: {
    fontFamily: FontFamily.poppinsBold,
    left: 174,
    fontWeight: "700",
    textAlign: "left",
    color: Color.white,
    fontSize: FontSize.size_mini,
    position: "absolute",
  },
  refLayout: {
    height: 65,
    width: 414,
    top: 831,
    position: "absolute",
  },
  icons8Layout: {
    height: 50,
    width: 50,
  },
  rectanglePosition: {
    left: 23,
    position: "absolute",
  },
  referralTypo: {
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
  },
  refInnerPosition: {
    left: 30,
    position: "absolute",
  },
  emailTypo: {
    height: 43,
    width: 182,
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
  },
  childLayout: {
    width: 320,
    height: 43,
  },
  emailPosition: {
    left: 25,
    position: "absolute",
  },
  notesPosition: {
    top: 664,
    position: "absolute",
  },
  sumbitLayout: {
    height: 46,
    position: "absolute",
  },
  unsplashjmurdhtm7ngIcon: {
    top: 62,
    left: 319,
    width: 67,
    height: 68,
    position: "absolute",
  },
  editProfile: {
    left: 155,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    color: Color.white,
    fontSize: FontSize.size_mini,
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
  update: {
    top: 699,
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
  refChild: {
    left: 0,
  },
  icons8ChatMessage5022: {
    left: 224,
    top: 835,
    width: 50,
    position: "absolute",
  },
  icons8Checkmark3222: {
    left: 330,
    top: 835,
    width: 50,
    position: "absolute",
  },
  icons8HomePage242: {
    top: 837,
    height: 50,
    width: 50,
  },
  icons8Star5022: {
    left: 119,
    top: 835,
    width: 50,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  refItem: {
    left: 545,
  },
  referral: {
    top: 175,
    left: 29,
    width: 336,
    height: 57,
    position: "absolute",
  },
  refInner: {
    top: 219,
    width: 323,
    height: 3,
  },
  nameRequired: {
    top: 250,
    left: 30,
    position: "absolute",
  },
  rectangleView: {
    top: 293,
    backgroundColor: Color.gainsboro,
    left: 23,
    position: "absolute",
  },
  email: {
    top: 562,
    height: 43,
    width: 182,
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
  },
  frameChild: {
    backgroundColor: Color.gainsboro,
  },
  frameView: {
    top: 589,
    left: 8,
    padding: 10,
    position: "absolute",
  },
  update1: {
    top: 800,
  },
  notes: {
    left: 13,
    height: 43,
    width: 182,
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
  },
  refChild1: {
    left: 90,
    width: 265,
    height: 58,
    backgroundColor: Color.gainsboro,
  },
  phone: {
    top: 446,
    height: 43,
    width: 182,
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
  },
  rectangleIcon: {
    top: 496,
    left: 23,
    position: "absolute",
  },
  businessOrgnisation: {
    top: 343,
    width: 297,
    height: 52,
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
  },
  refChild2: {
    top: 385,
    width: 320,
    height: 43,
    backgroundColor: Color.gainsboro,
  },
  sumbitChild: {
    top: 0,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.firebrick,
    shadowColor: "rgba(0, 0, 0, 0.09)",
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowRadius: 18,
    elevation: 18,
    shadowOpacity: 1,
    width: 133,
    left: 0,
  },
  submit: {
    top: 8,
    left: 33,
    fontSize: 24,
    fontFamily: FontFamily.robotoBold,
    width: 104,
    height: 31,
    fontWeight: "700",
    textAlign: "left",
    color: Color.white,
    position: "absolute",
  },
  sumbit: {
    top: 765,
    left: 269,
    width: 137,
  },
  ref: {
    backgroundColor: Color.white,
    flex: 1,
    height: 896,
    overflow: "hidden",
    width: "100%",
  },
});