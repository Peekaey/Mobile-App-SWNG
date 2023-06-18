// Modules  to work
import { StyleSheet, Image, TextInput, TouchableOpacity,Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store';
import MobileAppsManLogo from '../assets/MobileAppsManLogo.png'
import SWNGLogoWhite from '../assets/SWNGWhiteLogo.png'


// Asks for notification permission on first startup
const askNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = newStatus;
  }

  if (finalStatus !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  // Config/settings for the notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Listeners - not exactly sure what each thing does but related to receiving permissions
  Notifications.addNotificationReceivedListener(handleNotificationReceived);
  Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

  // Android specific code for displaying request permission for notification
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });

    const channel = await Notifications.getNotificationChannelAsync('default');
    if (channel && channel.sound === null) {
      await Notifications.setNotificationChannelAsync('default', {
        ...channel,
        sound: 'default',
      });
    }
  }
};

const handleNotificationReceived = (notification:any) => {
  console.log('Notification received:', notification);
  // Handle the received notification in the foreground
};

const handleNotificationResponse = (response:any) => {
  console.log('Notification response:', response);
  // Handle the user's response to the notification
};






export default function LoginScreen() {
  // Asks for Notification Permission on first run
  askNotificationPermission();


  // Declaring navigation dependencies
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});


  // State variables for various functions
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');
  const [isLoading, setLoading] = useState(false); 
  const [rememberPassword, setRememberPassword] = useState(false);

  // Grabs stored username and password - if rememeber password function was not used on last saved - uses placeholder values
  // Displays either placeholder or stored credentials for the login text fields
  useEffect(() => {
    const checkStoredLoginCredentials = async () => {
      const RememberPassword = await SecureStore.getItemAsync('RememberPassword');

      if (RememberPassword === 'true') {
        const storedUsername = await SecureStore.getItemAsync('LongTermUsername');
        const storedPassword = await SecureStore.getItemAsync('LongTermPassword');
        if (storedUsername && storedPassword) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberPassword(true);
        }
      } else {
        setUsername('');
        setPassword('');
      }
    };

    checkStoredLoginCredentials();
  }, []);


  const handleLogin = async () => {

    setLoading(true); // Start the loading process once "Login" has been clicked

    // Hitting wordpress API to get a JWT session token
    try {
      const response = await axios.post('https://www.swng.org.au/wp-json/jwt-auth/v1/token', {
        username,
        password,
      });
      // Extract the token, user_id, chapter, and role from the response
      const { token, user_id, chapter, role } = response.data;

      await SecureStore.setItemAsync('chapter', chapter)

      // Stores the token and userid in encrypted local storage
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user_id', user_id.toString());


      // If rememberPassword option was ticked - stores the username and password in encrypted local storage
      if (rememberPassword) {

        await SecureStore.setItemAsync('LongTermUsername', username);
        await SecureStore.setItemAsync('LongTermPassword', password);
        await SecureStore.setItemAsync('RememberPassword', rememberPassword.toString());

      // Otherwise deletes/clears and local saved username/passwords
      } else {
        console.log('Removing Password Long Term');

        await SecureStore.deleteItemAsync('LongTermUsername');
        await SecureStore.deleteItemAsync('LongTermPassword');
        await SecureStore.setItemAsync('RememberPassword', rememberPassword.toString());

      }

      // After login is successful - navigates to loading screen
      navigation.navigate('Loading');
    } catch (error) {
      console.log(error);
      // Otherwises sticks to login screen and displays error if username/password was incorrect
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  // State Variables to display placeholder username/password values in this order: Default , RememberPasswordTicked
  const usernamePlaceholder = rememberPassword ? 'Username' : 'Username';
  const passwordPlaceholder = rememberPassword ? 'Password' : 'Password';

  // Displays various content
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style={styles.image} source={SWNGLogoWhite} />
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
        // Use asterisks instead of plain text for password security
        secureTextEntry
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
        // Disable button style if loading
        style={[styles.button, isLoading && styles.disabledButton]} 
        onPress={handleLogin}
        // Disable button if loading
        disabled={isLoading} 
      >
        <Text style={styles.buttonText}>{isLoading ? 'Logging In...' : 'Login'}</Text>
      </TouchableOpacity>
      <Text style={styles.poweredBy}> Powered By </Text>
      <Image style={styles.mobileAppsLogo} source={MobileAppsManLogo} />
    </View>
  );
}


// Local Style Sheet
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
    top: 1,
  },

});

