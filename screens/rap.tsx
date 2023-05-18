import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TextInput, TouchableOpacity,SafeAreaView,TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Animated} from 'react-native';
import { Text, View } from '../components/Themed';
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

const Star = () => {
const starRatingOptions = [1, 2, 3, 4, 5];
const [starRating, setStarRating] = useState(null);
const animatedButtonScale = new Animated.Value(1);

const handlePressIn = () => {
  Animated.spring(animatedButtonScale, {
    toValue: 1.5,
    useNativeDriver: true,
    speed: 50,
    bounciness: 4,
  }).start();
};

const handlePressOut = () => {
  Animated.spring(animatedButtonScale, {
    toValue: 1,
    useNativeDriver: true,
    speed: 50,
    bounciness: 4,
  }).start();
};

const animatedScaleStyle = {
  transform: [{ scale: animatedButtonScale }],
};

return (
  <SafeAreaView>
    <View style={styles.container1}>
    <Text style={styles.rateheading} >Tap to Rate</Text>
      <View style={styles.stars}>
        {starRatingOptions.map((option) => (
          <TouchableWithoutFeedback
            onPressIn={() => handlePressIn(option)}
            onPressOut={() => handlePressOut(option)}
            onPress={() => setStarRating(option)}
            key={option}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= option ? 'star' : 'star-border'}
                size={32}
                style={starRating >= option ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Text style={styles.heading}>{starRating ? `${starRating}/5` : '0/5'}</Text>
    </View>
  </SafeAreaView>
);

};

const Chapters = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Chapter1'},
      {key:'2', value:'Chapter2'},
      {key:'3', value:'Chapter3'}
  ];
  return(
    <View>
      <Text style={styles.textboxAnchorText}> Select the Chapter:</Text>
      <SelectList data={data} setSelected={setSelected} />
    </View>
  );
};

const Members = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Member1'},
      {key:'2', value:'Member2'},
      {key:'3', value:'Member3'}
  ];
  return(
    <View>
      <Text style={styles.textboxAnchorText}> Select the Member:</Text>
      <SelectList data={data} setSelected={setSelected} />
    </View>
  );
};

export default function RapPage() {

  const [subject, setsubject] = React.useState('');
  const [review, setreview] = React.useState('');

  const isAnyFieldEmpty = !subject || !review;
  const buttonBackgroundColor = isAnyFieldEmpty ? '#8B0000' : '#c11717';

  return (

    
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <View style={styles.dropdown}>
        <View style={styles.chap_dropdown}>
          <Chapters/>
        </View>
        <View style={styles.mem_dropdown}>
         <Members/>
        </View>
      </View>

      <Star/>

      <View style={styles.centeredContainer}>
      <TextInput placeholder="Enter subject" value={subject} onChangeText={text => setsubject(text)} style={styles.input}></TextInput>
      </View>
    
      <View style={styles.centeredContainer}>
      <TextInput placeholder="Enter your review..."  value={review} onChangeText={text => setreview(text)} style={styles.input1}></TextInput>
      </View>

      
      <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
          disabled={isAnyFieldEmpty}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>

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
    top: 110,
  },
  //dropdown css
  dropdown:{
   flexDirection: 'row',
   marginLeft: '5%',
   marginBottom: '2%',
   backgroundColor: "white",
   position: "absolute",
   top: 40,
   width: "100%",
   zIndex: 1,
  },
  chap_dropdown:{
    padding:5,
    width: "45%",
   },
  mem_dropdown:{
    padding:5,
    width: "45%",
   },

  textboxAnchorText: {
    alignSelf: 'flex-start',
    marginBottom: '2%',
  },
  image: {
    marginTop: '5%',
    marginBottom: '5%',
    resizeMode: 'contain',
    height: '20%',
    width: '80%', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
  // input text css
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input1: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  
  button: {
    backgroundColor: '#c11717',
    width: '30%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
    top:110,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // star rating css

  rateheading:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    top:90,
   },
});