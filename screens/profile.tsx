
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Text, View } from '../components/Themed';
import React, {useEffect, useState} from 'react';

import CheckTokenStatusOnPageLoad from "../components/checkTokenStatus";
import userAvatar from '../assets/userAvatar.png'
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import axios from "axios";




async function getAvatar() {
  let storedAvatarURL = await SecureStore.getItemAsync('avatarURL');
  if (storedAvatarURL === null) {
    console.log("Profile Photo Local Storage is empty");
    storedAvatarURL = '';
  } else {
    console.log("Profile Photo Local Storage is not empty and is:", storedAvatarURL);
  }

  return storedAvatarURL;
}

async function getName() {
  let storedUsername = await SecureStore.getItemAsync('userName');
  if (storedUsername === null) {
    storedUsername = '';
  } else {
  }

  return storedUsername;
}


// const for update data
const updateUserProfile = async (user_name:any, user_url:any, user_description:any) => {

  const storedToken = await SecureStore.getItemAsync('token');
  const storedUserId = await SecureStore.getItemAsync('user_id');

  // console.log ("PROFILE SCREEN STORED USER ID", storedUserId)
  // console.log ("PROFILE SCREEN STORED token", storedToken)


  const end_point = `https://swng.org.au/wp-json/wp/v2/users/${storedUserId}`;
  const data ={};
  if(user_name){
    data.name = user_name;
  }
  if(user_url){
    data.url = user_url;
  }
  if(user_description){
    data.description = user_description;
  }

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(end_point, options);
  const result = await response.json();
  return result;
};






export default function ProfilePage() {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


CheckTokenStatusOnPageLoad();


  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetchAvatar = async () => {
      const storedAvatarURL = await getAvatar();

      if (storedAvatarURL === '') {
        setAvatarUrl(undefined);
      } else {
        setAvatarUrl(storedAvatarURL);
      }
    };

    fetchAvatar();
  }, []);

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchusername = async () => {
      const storedUsername = await getName();

      if (storedUsername === '') {
        setUsername(undefined);
      } else {
        setUsername(storedUsername)
      }
    };

    fetchusername();
  }, []);



  const [isUpdated, setIsUpdated] = useState(false);
  const [user_name, setName] = useState('');
  const [user_description, setdescription] = useState('');
  const[checkValidURL, setcheckValidURL] = useState(false);
  const [user_url, setUrl] = useState('');

  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);  //Variable for regx validation
  const is_URL_Wrong = checkValidURL;
  const is_URL_empty = user_url;
  const buttonBackgroundColor = is_URL_Wrong || !isAnyFieldFilled ? '#8B0000' : '#ed3434';


  function updateProfile() {

    const validateToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
          navigation.navigate('Login');
          Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
        }
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Your-User-Agent',
          },
        });

        const response = await axiosInstance.post('https://swng.org.au/wp-json/jwt-auth/v1/token/validate');
        if (response.data.code === 'jwt_auth_valid_token' && response.data.data.status === 200) {
          console.log('Token is valid111');
          await updateinfo();
        } else {
          navigation.navigate('Login');
          console.log('Token is Invalid111');
          Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
        }
      } catch (error) {
        navigation.navigate('Login');
        console.log("Token is error")
        Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
      }
    };

    validateToken();

    return null;
  }

  const updateinfo = async () => {
    const result = await updateUserProfile(user_name, user_url, user_description); //call updateUserProfile function
    console.log(result);

    setIsUpdated(true);
    setName('');
    setUrl('');
    setdescription('');
    setcheckValidURL(false);
    setIsAnyFieldFilled(false);
  };





  useEffect(() => {
    if (isUpdated) {
      Alert.alert(
          'Update Successful',
          'Your profile has been updated successfully.',
          [
            {
              text: 'OK',
              onPress: () => setIsUpdated(false),
            },
          ]
      );
    }
  }, [isUpdated]);
  //function for regx validation
  const handleCheckURL = text => {
    let regx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/im;
    setUrl(text);
    if (regx.test(text)) {
      setcheckValidURL(false);
    }
    else {
      setcheckValidURL(true);
    }
  };

  // check if the url input box is empty
  const handleBlur = () => {
    if(is_URL_empty == ""){
      setcheckValidURL("");
    }
  };

  return (

      <View style={styles.container}>

        <View style={styles.centeredContainer}>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>

        <View style={styles.centeredContainer}>
          {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.profileimage} />
          ) : (
              <View>
                <Image source={userAvatar} style={styles.profileimage} />
              </View>
          )}
        </View>


        <View style={styles.centeredContainer}>
          <Text style={styles.ProfilePhotoAnchorText}> {username}'s profile  </Text>

          <Text style={styles.textboxAnchorText}>Business Name</Text>
          <TextInput
              placeholder="Enter business name"
              onChangeText={(text) => {
                setName(text);
                setIsAnyFieldFilled(!!text);
              }}
              style={styles.input}
          />
        </View>

        <View style={styles.centeredContainer}>
          <Text style={styles.textboxAnchorText}>Business Website URL</Text>
          <TextInput
              placeholder="https://example.com"
              value={user_url}
              onChangeText={(text) => {
                handleCheckURL(text);
                setIsAnyFieldFilled(!!text);
              }}
              onBlur={handleBlur}
              style={styles.input}
          />
        </View>
        {checkValidURL? (
            <Text style={styles.errorMessage}>Please enter a valid URL</Text>
        ) : (
            <Text style={styles.errorMessage}></Text>
        )}

        <View style={styles.centeredContainer}>
          <Text style={styles.textboxAnchorText}>Company Description</Text>
          <TextInput
              placeholder="Enter company description"
              value={user_description}
              onChangeText={(text) => {
                setdescription(text);
                setIsAnyFieldFilled(!!text);
              }}
              style={styles.input}
          />
        </View>

        <View style={styles.centeredContainer}>
          <TouchableOpacity
              style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
              disabled={checkValidURL || !isAnyFieldFilled}
              onPress={updateProfile}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  centeredContainer: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ed3434',
    width: '40%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textboxAnchorText: {
    marginBottom: '2%',
  },
  ProfilePhotoAnchorText: {
    marginTop: '5%',
    marginBottom: '5%'
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 13,
    position:'absolute',
    margin:10,
    top: 335,
    marginLeft: 40,
  },
  //pop-up css
  popUpContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpTextContainer:{
    backgroundColor: '#fff',
    padding: 20,
  },
  popUpText:{
    fontSize: 28,
  },
  popUpButton:{
    color: 'red',
    marginTop: 20,
    fontSize: 20,
    marginLeft: 100,
  },
  profileimage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
