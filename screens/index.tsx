
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';

// Main Function - Needs to be exported so that the react-navigation can define and read the page
export default function IndexPage() {

  // Anything in return is content displayed on the page
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style  = {styles.image
      } source={require('../assets//thumbnail_SWNG-white.png')} />
      <Text> Index Page</Text>
</View>
  );

}

// More Styling
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