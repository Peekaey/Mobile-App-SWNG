import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, Toucha
        leOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Text, View } from '../components/Themed';

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [businessName, setBusinessName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [businessUrl, setBusinessUrl] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  useEffect(() => {
    const getAvatar = async () => {
      const storedUserId = await AsyncStorage.getItem('avatarURL');
      if (storedUserId === null) {
        console.log('Profile Photo Local Storage is empty');
        setAvatarUrl(undefined);
      } else {
        console.log('Profile Photo Local Storage is not empty and is:', storedUserId);
        setAvatarUrl(storedUserId);
      }
    };

    getAvatar();
  }, []);

  const submitProfileUpdate = async () => {
    try {
      // Send the updated profile information to the backend
      const updatedProfile = {
        businessName,
        userEmail,
        businessUrl,
        companyDescription,
      };
      const response = await axios.post(
        'https://www.swng.org.au/wp-json/jwt-auth/v1/token', // Corrected URL
        updatedProfile,
        {
          headers: {
            Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')), // Include the JWT token in the request headers
          },
        }
      );

      // Handle the response from the backend if necessary
      console.log('Profile update successful:', response.data);
    } catch (error) {
      // Handle the error
      console.error('Profile update failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        ) : (
          <View>
            <Image source={require('../assets/user-avatar.png')} style={styles.avatarImage} />
            <Text style={styles.profilePhotoAnchorText}>Edit ✎</Text>
          </View>
        )}
      </View>

      {/* Business Name */}
      <View style={styles.textInputContainer}>
        <Text style={styles.textboxAnchorText}>Business Name</Text>
        <TextInput
          placeholder="Enter business name"
          style={styles.input}
          value={businessName}
          onChangeText={(text) => setBusinessName(text)}
        />
      </View>

      {/* User Email */}
      <View style={styles.textInputContainer}>
        <Text style={styles.textboxAnchorText}>User Email</Text>
        <TextInput
          placeholder="Enter user email"
          style={styles.input}
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />
      </View>

      {/* Business Website URL */}
      <View style={styles.textInputContainer}>
        <Text style={styles.textboxAnchorText}>Business Website URL</Text>
        <TextInput
          placeholder="Enter business website URL"
          style={styles.input}
          value={businessUrl}
          onChangeText={(text) => setBusinessUrl(text)}
        />
      </View>

      {/* Company Description */}
      <View style={styles.textInputContainer}>
        <Text style={styles.textboxAnchorText}>Company Description</Text>
        <TextInput
          placeholder="Enter company description"
          style={[styles.input, styles.companyDescriptionInput]}
          value={companyDescription}
          onChangeText={(text) => setCompanyDescription(text)}
          multiline
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: businessName !== '' ? '#2ea043' : '#13461c' },
        ]}
        disabled={businessName === ''}
        onPress={submitProfileUpdate}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profilePhotoAnchorText: {
    fontSize: 14,
    marginTop: -20,
    marginLeft: 70,
    color: 'blue',
  },
  textboxAnchorText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  companyDescriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2ea043',
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputContainer: {
    marginBottom: 20,
  },
});
