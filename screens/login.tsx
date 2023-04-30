import { StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, KeyboardAvoidingView, } from 'react-native';

import { Text, View } from '../components/Themed';
import logo from '../assets/favicon.png'
import React, { useState } from 'react';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import { Navigator } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from '../App';




export default function LoginScreen() {

  

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // const Stack = createNativeStackNavigator();

  // const navigation = useNavigation();
  navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

  return (
    <View style={styles.container}>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style  = {styles.image

      } source={require('../assets//thumbnail_SWNG-white.png')} />
      <Text></Text>
      <TextInput 
      placeholder="Username" 
      style={styles.input}
      > Username </TextInput>
            <TextInput 
      placeholder="Password" 
      style={styles.input}
      > Password </TextInput>

<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home' as never)}   >
<Text style={styles.buttonText} >Login</Text>
</TouchableOpacity>

</View>
  );


  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: '5%',
    marginBottom: '5%',
    resizeMode: 'contain',
    height: '20%',
    width: '80%'
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '50%',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#c11717',
    width: '80%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

