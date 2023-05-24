import { StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../components/Themed';

import React, { useState, useEffect } from 'react';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import { Navigator } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from '../App';
import axios from 'axios';

import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons'; // Import the required icon library

const enableForegroundNotifications = async () => {
  let settings = await Notifications.getPermissionsAsync();
  let finalStatus = settings.granted;

  if (!finalStatus) {
    settings = await Notifications.requestPermissionsAsync();
    finalStatus = settings.granted;
  }

  if (!finalStatus) {
    console.log('Notification permission not granted');
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  Notifications.addNotificationReceivedListener(handleNotificationReceived);
  Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });

    const channel = await Notifications.getNotificationChannelAsync('default');
if (channel?.sound === null) {
  await Notifications.setNotificationChannelAsync('default', {
    ...channel,
    sound: 'default',
  });
}
  }
};

const handleNotificationReceived = (notification) => {
  console.log('Notification received:', notification);
  // Handle the received notification in the foreground
};

const handleNotificationResponse = (response) => {
  console.log('Notification response:', response);
  // Handle the user's response to the notification
};

// Call the function to enable foreground notifications and schedule a local notification
enableForegroundNotifications();

// Schedule a local notification
const scheduleLocalNotification = async () => {
  const schedulingOptions = {
    content: {
      title: 'Scheduled Notification',
      body: "Notification Contents",
    },
    trigger: {
      seconds: 15, // Schedule after 15 seconds
    },
  };

  const notificationId = await Notifications.scheduleNotificationAsync(schedulingOptions);
  console.log('Scheduled notification with ID:', notificationId);
};

scheduleLocalNotification();


var defaultUsername:any;
var defaultPassword:any;


export default function LoginScreen() {




  

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setError] = useState('');

  const [isLoading, setLoading] = useState(false); // New state variable

  const [rememberPassword, setRememberPassword] = useState(false);


  useEffect(() => {
    const checkStoredLoginCredentials = async () => {
      const RememberPassword = await AsyncStorage.getItem('RememberPassword');

      if (RememberPassword === 'true') {
        const storedUsername = await AsyncStorage.getItem('LongTermUsername');
        const storedPassword = await AsyncStorage.getItem('LongTermPassword');
        if (storedUsername && storedPassword) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberPassword(true); // Set rememberPassword to true if credentials are found
        }
      } else {
        setUsername('');
        setPassword('');
      }
    };

    checkStoredLoginCredentials();
  }, []); // Empty dependency array to run the effect only once





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

      if (rememberPassword == true) {
        console.log("Storing Password Long Term");
        
        await AsyncStorage.setItem('LongTermUsername', username);
        await AsyncStorage.setItem('LongTermPassword', password);
        await AsyncStorage.setItem('RememberPassword', rememberPassword.toString())

        const LongTermUsername = await AsyncStorage.getItem('LongTermUsername');
        const LongTermPassword = await AsyncStorage.getItem('LongTermPassword');
        const RememberPassword = await AsyncStorage.getItem('RememberPassword')
        console.log('Stored Username:', LongTermUsername);
        console.log('Stored Password:', LongTermPassword);
        console.log('Remember Password Stored valuje:', RememberPassword)
      }

      if (rememberPassword == false) {
        console.log("Removing Password Long Term");
        
        await AsyncStorage.removeItem('LongTermUsername');
        await AsyncStorage.removeItem('LongTermPassword');

        await AsyncStorage.setItem('RememberPassword', rememberPassword.toString())

        const LongTermUsername = await AsyncStorage.getItem('LongTermUsername');
        const LongTermPassword = await AsyncStorage.getItem('LongTermPassword');
        const RememberPassword = await AsyncStorage.getItem('RememberPassword')
        console.log('Stored Username:', LongTermUsername);
        console.log('Stored Password:', LongTermPassword);
        console.log('Remember Password Stored valuje:', RememberPassword)
      }





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

  const usernamePlaceholder = rememberPassword ? '' : 'Username';
  const passwordPlaceholder = rememberPassword ? '' : 'Password';

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style={styles.image} source={require('../assets//thumbnail_SWNG-white.png')} />
      <Text></Text>
      {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TextInput
        placeholder={`${usernamePlaceholder}`}
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder={`${passwordPlaceholder}`}
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Use asterisks instead of plain text
      />
  
  <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Remember Password  </Text>
        <TouchableOpacity onPress={() => setRememberPassword(!rememberPassword)}>
          <View
            style={[
              styles.checkbox,
              rememberPassword ? styles.checkedBox : styles.uncheckedBox,
            ]}
          >
            {rememberPassword ? (
              <FontAwesome name="check" color="white" size={12} style={styles.checkboxTick} />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>


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
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: 'brown',
  },
  uncheckedBox: {
    backgroundColor: 'transparent',
  },
  checkboxLabel: {

    marginLeft: 8,
  },
  checkboxTick: {
    top: 1, // Adjust this value to vertically center the tick icon
  },

});

