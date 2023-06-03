import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Modal, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Text, View } from '../components/Themed';
import React, {useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';

// const for pop-up
const MyModal = ({visible, onClose}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.popUpContainer}>
        <View style={styles.popUpTextContainer}>
          <Text style={styles.popUpText}>Your Profile is updated</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.popUpButton}>RETURN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// const for update data 
const updateUserProfile = async (user_name, user_url, user_description) => {

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

    const [isUpdated, setIsUpdated] = useState(false);
    const [user_name, setName] = useState('');
    const [user_description, setdescription] = useState('');
    const[checkValidURL, setcheckValidURL] = useState(false);
    const [user_url, setUrl] = useState('');
    
    //Variable for regx validation 
    const is_URL_Wrong = checkValidURL;
    const is_URL_empty = user_url;
    const buttonBackgroundColor = is_URL_Wrong? '#c11717' : '#ed3434';

    const updateinfo = async () => {
    const result = await updateUserProfile(user_name, user_url, user_description); //call updateUserProfile function
     console.log(result);

    setIsUpdated(true);
    setName('');
    setUrl('');
    setdescription('');
    };

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
        <Image source={require('../assets/userAvatar.png')} style={styles.image} />
        <Text style={styles.ProfilePhotoAnchorText}> Edit ✎</Text>
        </View>

        <MyModal visible={isUpdated} onClose={() => setIsUpdated(false)} />
        <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Business Name</Text>
        <TextInput placeholder="Enter business name"  onChangeText={setName} style={styles.input}></TextInput>
        </View>

        <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Business Website URL</Text>
        <TextInput placeholder="https://example.com" value={user_url} onChangeText={text => handleCheckURL(text)} 
        onBlur={handleBlur} style={styles.input}></TextInput>
        </View>
        {checkValidURL? (
          <Text style={styles.errorMessage}>Please enter a valid URL</Text>
        ) : (
          <Text style={styles.errorMessage}></Text>
        )}

        <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Company Description</Text>
        <TextInput placeholder="Enter company description" value={user_description} onChangeText={setdescription} style={styles.input}></TextInput>
        </View>

        <View style={styles.centeredContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} disabled={is_URL_Wrong} onPress={updateinfo}>
        <Text style={styles.buttonText} >Update Profile</Text>
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
});