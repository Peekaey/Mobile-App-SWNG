

import { StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import CheckTokenStatus from '../components/checkTokenStatus';
import userAvatar from '../assets/userAvatar.png'


var storedUserId:any;

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



export default function ProfilePage() {

  CheckTokenStatus();

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);

  const isAnyFieldEmpty = !isAnyFieldFilled;
  const buttonBackgroundColor = isAnyFieldFilled ? '#2ea043' : '#13461c';
 

  const SubmitProfileUpdate = () => {
    console.log('Update Profile Picture');

  };


  return (
    
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>

      <View style={styles.centeredContainer}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.image} />
      ) : (
        <View>
          <Image
            source={userAvatar}
            style={styles.image}
          />
          <Text style={styles.ProfilePhotoAnchorText}> Edit ✎ </Text>
        </View>
  )}
</View>
      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Username</Text>
        <TextInput
          placeholder="johnapplesmith@gmail.com"
          style={styles.input}
          value={username}
          onChangeText={text => {
            setUsername(text);
            setIsAnyFieldFilled(text !== '' || phoneNumber !== '' || password !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Phone Number</Text>
        <TextInput
          placeholder="0410236256"
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => {
            setPhoneNumber(text);
            setIsAnyFieldFilled(text !== '' || username !== '' || password !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Password</Text>
        <TextInput
          placeholder="*******"
          style={styles.input}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setIsAnyFieldFilled(text !== '' || username !== '' || phoneNumber !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
          disabled={isAnyFieldEmpty}
          onPress={SubmitProfileUpdate}
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
    width: '50%',
    backgroundColor: 'white',
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
    backgroundColor: '#2ea043',
    width: '80%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textboxAnchorText: {
    paddingTop: 20,
  },
  ProfilePhotoAnchorText: {
    marginBottom: '5%'
  }

});