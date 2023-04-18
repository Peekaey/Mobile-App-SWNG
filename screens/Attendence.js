import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const Attendence = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.attendence}>
      <Image
        style={styles.swngLogoTransparentCmyk13}
        resizeMode="cover"
        source={require("../assets/swng-logo-transparent-cmyk1-2.png")}
      />
      <Image
        style={styles.unsplashjmurdhtm7ngIcon}
        resizeMode="cover"
        source={require("../assets/unsplashjmurdhtm7ng.png")}
      />
      <Image
        style={styles.unsplashjmurdhtm7ngIcon}
        resizeMode="cover"
        source={require("../assets/unsplashjmurdhtm7ng.png")}
      />
      <Text
        style={[styles.attendance, styles.attendanceFlexBox]}
      >{`Attendance `}</Text>
      <Image
        style={styles.attendenceChild}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
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
        style={[styles.icons8HomePage242, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/home-icon1.png")}
      />
      <Image
        style={[styles.icons8Star5022, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/star1.png")}
      />
      <View style={styles.list}>
        <Text style={[styles.am, styles.amTypo]}>10:40 am</Text>
        <View style={[styles.rectangleParent, styles.parentLayout]}>
          <View style={styles.groupChild} />
          <Text style={[styles.mark, styles.markTypo]}>{`Mark `}</Text>
          <Text style={[styles.am1, styles.amTypo]}>09:30 am</Text>
          <View style={styles.ellipseParent}>
            <Image
              style={styles.groupItem}
              resizeMode="cover"
              source={require("../assets/ellipse-1.png")}
            />
            <Text style={[styles.m, styles.mTypo]}>M</Text>
          </View>
          <Text
            style={[styles.youAreMarkedContainer, styles.attendanceFlexBox]}
          >
            <Text style={styles.youAreMarked}>{`You are marked `}</Text>
            <Text style={styles.present}>present</Text>
          </Text>
        </View>
        <View style={[styles.rectangleGroup, styles.parentLayout]}>
          <View style={styles.groupChild} />
          <View style={styles.ellipseParent}>
            <Image
              style={styles.groupItem}
              resizeMode="cover"
              source={require("../assets/ellipse-11.png")}
            />
            <Text style={[styles.p, styles.mTypo]}>P</Text>
          </View>
          <Text
            style={[styles.youAreMarkedContainer, styles.attendanceFlexBox]}
          >
            <Text style={styles.youAreMarked}>{`You are marked `}</Text>
            <Text style={styles.present}>present</Text>
          </Text>
        </View>
        <View style={[styles.pmParent, styles.parentLayout]}>
          <Text style={[styles.pm, styles.amTypo]}>12:45 pm</Text>
          <View style={styles.groupChild} />
          <Text style={[styles.clarissa, styles.markTypo]}>Clarissa</Text>
          <View style={styles.ellipseParent}>
            <Image
              style={styles.groupItem}
              resizeMode="cover"
              source={require("../assets/ellipse-12.png")}
            />
            <Text style={[styles.c, styles.mTypo]}>C</Text>
          </View>
        </View>
      </View>
      <Image
        style={[styles.attendenceItem, styles.attendenceLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Image
        style={[styles.attendenceInner, styles.attendenceLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-8.png")}
      />
      <Image
        style={[styles.icons8ChatMessage5024, styles.icons8Position]}
        resizeMode="cover"
        source={require("../assets/messeage.png")}
      />
      <Image
        style={[styles.icons8Checkmark3224, styles.icons8Position]}
        resizeMode="cover"
        source={require("../assets/tick.png")}
      />
      <Image
        style={[styles.icons8HomePage244, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/home-icon1.png")}
      />
      <Image
        style={[styles.icons8Star5024, styles.icons8Position]}
        resizeMode="cover"
        source={require("../assets/star1.png")}
      />
      <Pressable
        style={[styles.icons8ChatMessage5024, styles.icons8Position]}
        onPress={() => navigation.navigate("Ref")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/messeage.png")}
        />
      </Pressable>
      <Image
        style={[styles.icons8Checkmark3224, styles.icons8Position]}
        resizeMode="cover"
        source={require("../assets/tick.png")}
      />
      <Pressable
        style={[styles.icons8HomePage244, styles.icons8Layout]}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/home-icon1.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.icons8Star5024, styles.icons8Position]}
        onPress={() => navigation.navigate("RAP")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/star1.png")}
        />
      </Pressable>
      <Text style={styles.penelope}>Penelope.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  attendanceFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  icons8Layout: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  amTypo: {
    height: 22,
    fontSize: FontSize.size_sm,
    color: Color.gray,
    fontFamily: FontFamily.rubikRegular,
    textAlign: "left",
    position: "absolute",
  },
  parentLayout: {
    height: 76,
    width: 374,
    position: "absolute",
  },
  markTypo: {
    height: 21,
    width: 169,
    color: Color.dimgray,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.rubikRegular,
    textAlign: "left",
    position: "absolute",
  },
  mTypo: {
    width: 20,
    alignItems: "center",
    display: "flex",
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    fontSize: FontSize.size_3xl,
    height: 46,
    top: 0,
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  attendenceLayout: {
    height: 65,
    width: 414,
    position: "absolute",
  },
  icons8Position: {
    top: 841,
    height: 50,
    width: 50,
    position: "absolute",
  },
  swngLogoTransparentCmyk13: {
    top: 61,
    borderRadius: Border.br_23xl,
    width: 184,
    height: 84,
    left: 0,
    position: "absolute",
  },
  unsplashjmurdhtm7ngIcon: {
    top: 69,
    left: 334,
    width: 67,
    height: 68,
    position: "absolute",
  },
  attendance: {
    top: 180,
    fontSize: 19,
    fontFamily: FontFamily.poppinsBold,
    width: 336,
    height: 57,
    color: Color.black,
    textAlign: "left",
    fontWeight: "700",
    left: 21,
  },
  attendenceChild: {
    top: 221,
    left: 19,
    width: 323,
    height: 3,
    position: "absolute",
  },
  icons8ChatMessage5022: {
    left: 226,
    top: 835,
  },
  icons8Checkmark3222: {
    left: 332,
    top: 835,
  },
  icons8HomePage242: {
    left: 25,
    top: 837,
  },
  icons8Star5022: {
    left: 121,
    top: 835,
  },
  am: {
    top: 120,
    left: 285,
    width: 63,
  },
  groupChild: {
    top: -1,
    left: -1,
    borderRadius: Border.br_sm,
    borderStyle: "solid",
    borderColor: "#dedede",
    borderWidth: 1,
    width: 376,
    height: 78,
    position: "absolute",
  },
  mark: {
    left: 81,
    top: 15,
    height: 21,
    width: 169,
    color: Color.dimgray,
  },
  am1: {
    top: 21,
    left: 283,
    width: 65,
  },
  groupItem: {
    top: 2,
    height: 44,
    width: 45,
    left: 0,
    position: "absolute",
  },
  m: {
    left: 13,
  },
  ellipseParent: {
    height: 46,
    width: 45,
    left: 15,
    top: 15,
    position: "absolute",
  },
  youAreMarked: {
    color: Color.gray,
    fontFamily: FontFamily.rubikRegular,
  },
  present: {
    fontFamily: FontFamily.rubikBold,
    color: Color.darkslategray,
    fontWeight: "700",
  },
  youAreMarkedContainer: {
    top: 43,
    fontSize: FontSize.size_mini,
    width: 171,
    height: 18,
    left: 81,
  },
  rectangleParent: {
    top: 0,
    width: 374,
    left: 0,
  },
  p: {
    left: 16,
  },
  rectangleGroup: {
    top: 100,
    left: 0,
  },
  pm: {
    top: 23,
    left: 286,
    width: 59,
  },
  clarissa: {
    top: 19,
    left: 82,
  },
  c: {
    left: 15,
    width: 20,
    alignItems: "center",
    display: "flex",
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    fontSize: FontSize.size_3xl,
  },
  pmParent: {
    top: 205,
    left: 1,
  },
  list: {
    top: 249,
    width: 375,
    height: 281,
    left: 21,
    position: "absolute",
  },
  attendenceItem: {
    left: 2,
    top: 835,
  },
  attendenceInner: {
    top: 837,
    left: 0,
  },
  icons8ChatMessage5024: {
    left: 224,
  },
  icons8Checkmark3224: {
    left: 330,
  },
  icons8HomePage244: {
    top: 843,
    left: 23,
  },
  icons8Star5024: {
    left: 119,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  penelope: {
    top: 361,
    left: 103,
    width: 173,
    height: 26,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.rubikRegular,
    textAlign: "left",
    color: Color.black,
    position: "absolute",
  },
  attendence: {
    backgroundColor: Color.white,
    flex: 1,
    height: 896,
    overflow: "hidden",
    width: "100%",
  },
});

export default Attendence;
