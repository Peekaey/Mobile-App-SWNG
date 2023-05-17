import { StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../components/Themed';

import React, { useState } from 'react';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import { Navigator } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from '../App';
import axios from 'axios';








export default function LoginScreen() {

  

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {

    try {
      const response = await axios.post('https://www.swng.org.au/wp-json/jwt-auth/v1/token', {
        username,
        password,
      });
  
      const token = response.data.token; // Retrieve the JWT token from the API response
      await AsyncStorage.setItem('token', token);
      //





      
      // Perform any necessary actions after successful authentication, such as navigating to a new screen
      console.log('JWT SWNG Token' + token)
      navigation.navigate('Loading' as never);
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style  = {styles.image

      } source={require('../assets//thumbnail_SWNG-white.png')} />
      <Text></Text>
      <TextInput placeholder="Username" style={styles.input} value ={username} onChangeText={text => setUsername(text)}/>
      <TextInput placeholder="Password" style={styles.input} value ={password} onChangeText={text => setPassword(text)}/>  
      <TouchableOpacity style={styles.button} onPress={handleLogin}   >
      <Text style={styles.buttonText} >Login</Text>
      </TouchableOpacity>
      <Text style = {styles.poweredBy}> Powered By </Text>
      <Image style  = {styles.mobileAppsLogo} source={require('../assets/MobileAppsManLogo.png')} />


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
  mobileAppsLogo: {

    marginBottom: '5%',
    resizeMode: 'contain',
    height: '10%',
    width: '50%'
  },
  poweredBy: {
    height: '10%',
    width: '50%',
    textAlign: 'center',
    marginTop: '20%',
    paddingTop: '15%',
    fontSize: 14,
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

