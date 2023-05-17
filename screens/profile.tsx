
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, } from 'react-native';

import { Text, View } from '../components/Themed';


export default function ProfilePage() {

  return (

    <View style={styles.container}>
          <View style={styles.centeredContainer}>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </View>

          <View style={styles.centeredContainer}>
      <Image source={require('../assets/user-avatar.png')} style={styles.image} />
      <Text style={styles.ProfilePhotoAnchorText}> Edit ✎ </Text>
      </View>

      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}> Username</Text>
      <TextInput placeholder="johnapplesmith@gmail.com" style={styles.input}/> 
      </View>

      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}> Phone Number</Text>
      <TextInput placeholder="0410236256" style={styles.input}/>
      </View>


      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}> Password</Text>
      <TextInput placeholder="*******" style={styles.input}/> 
      </View>
<View style={styles.centeredContainer}>
<TouchableOpacity style={styles.button}>
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
    alignItems: 'center',
    textAlign: 'center',
    color: 'red'
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

  },
  ProfilePhotoAnchorText: {
    marginBottom: '5%'
  }

});