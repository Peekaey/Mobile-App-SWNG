import { StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
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

  const [errorMessage, setError] = useState('');

  const [isLoading, setLoading] = useState(false); // New state variable


  const handleLogin = async () => {

    setLoading(true); // Start the loading process

    try {
      const response = await axios.post('https://www.swng.org.au/wp-json/jwt-auth/v1/token', {
        username,
        password,
      });
  
      const { token, user_id } = response.data; // Extract the token and user_id from the response
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user_id', user_id.toString()); // Store the user_id in AsyncStorage

      // This is how you store/call the session token
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('user_id');
      console.log('Stored Token:', storedToken);
      console.log('Stored User ID:', storedUserId);

      

      // Perform any necessary actions after successful authentication, such as navigating to a new screen

      navigation.navigate('Loading' as never);
    } catch (error) {
      // Handle login error
      console.log(error);
      setError('Invalid username or password');
    } finally {
      setLoading(false); // Reset the loading state
    }

  };


  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style={styles.image} source={require('../assets//thumbnail_SWNG-white.png')} />
      <Text></Text>
      {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Use asterisks instead of plain text
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]} // Disable button style if loading
        onPress={handleLogin}
        disabled={isLoading} // Disable button if loading
      >
        <Text style={styles.buttonText}>{isLoading ? 'Logging In...' : 'Login'}</Text>
      </TouchableOpacity>
      <Text style={styles.poweredBy}> Powered By </Text>
      <Image style={styles.mobileAppsLogo} source={require('../assets/MobileAppsManLogo.png')} />
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {

    resizeMode: 'contain',
    height: 200,
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
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#8B0000',
  }
});

