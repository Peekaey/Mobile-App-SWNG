import { StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import CheckTokenStatus from '../components/checkTokenStatus';
import axios from 'axios';

var storedUserId: any;

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

async function fetchUserDetails(userId: number) {
  try {
    const response = await axios.get(`https://www.swng.org.au/wp-json/wp/v2/users/${userId}`);
    const user = response.data;
    console.log('User Details:', user);
    // Handle the user details here as needed
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Handle the error here
  }
}

export default function ProfilePage() {
  CheckTokenStatus();

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessURL, setBusinessURL] = useState('');
  const [description, setDescription] = useState('');
  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);

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

  const handleProfileUpdate = () => {
    // Perform profile update action here
    console.log('Perform profile update action');
  };

  const handleFetchUserDetails = () => {
    fetchUserDetails(100); // Provide the user ID to fetch the details
  };

  const isAnyFieldEmpty = !isAnyFieldFilled;
  const buttonBackgroundColor = isAnyFieldFilled ? '#2ea043' : '#13461c';

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
            <Image source={require('../assets/user-avatar.png')} style={styles.image} />
            <Text style={styles.ProfilePhotoAnchorText}> Edit ✎ </Text>
          </View>
        )}
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Business Name</Text>
        <TextInput
          placeholder="Enter business name"
          style={styles.input}
          value={businessName}
          onChangeText={(text) => {
            setBusinessName(text);
            setIsAnyFieldFilled(text !== '' || email !== '' || businessURL !== '' || description !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Email</Text>
        <TextInput
          placeholder="Enter email"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setIsAnyFieldFilled(text !== '' || businessName !== '' || businessURL !== '' || description !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Business URL</Text>
        <TextInput
          placeholder="Enter business URL"
          style={styles.input}
          value={businessURL}
          onChangeText={(text) => {
            setBusinessURL(text);
            setIsAnyFieldFilled(text !== '' || businessName !== '' || email !== '' || description !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}> Description</Text>
        <TextInput
          placeholder="Enter description"
          style={styles.input}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setIsAnyFieldFilled(text !== '' || businessName !== '' || email !== '' || businessURL !== '');
          }}
        />
      </View>

      <View style={styles.centeredContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
          disabled={isAnyFieldEmpty}
          onPress={handleProfileUpdate}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFetchUserDetails}>
          <Text style={styles.buttonText}>Fetch User Details</Text>
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
    marginBottom: '5%',
  },
});
