import { StyleSheet, ScrollView, TextInput, TouchableOpacity,SafeAreaView,TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Animated} from 'react-native';
import { Text, View } from '../components/Themed';
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Star = () => {
const [star_Rating, setStar_Rating] = useState(null);
const animatedButtonScale = new Animated.Value(1);
const starRatingArray = [1, 2, 3, 4, 5];

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
        {starRatingArray.map((option) => (
          <TouchableWithoutFeedback
            onPressIn={() => handlePressIn(option)}
            onPressOut={() => handlePressOut(option)}
            onPress={() => setStar_Rating(option)}
            key={option}>

            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={star_Rating >= option ? 'star' : 'star-border'}
                size={32}
                style={star_Rating >= option ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Text style={styles.heading}>{star_Rating ? `${star_Rating}/5` : '0/5'}</Text>
    </View>
  </SafeAreaView>
);
};

const Chapters_Members = () => {
  const [selected, setSelected] = React.useState("");
  const [chapterNames, setChapterNames] = React.useState([]);
  const [memberNames, setMemberNames] = React.useState([]);

  React.useEffect(() => {
      async function fetchChapterNames() {
          try {
              const response = await fetch(
                  "https://www.swng.org.au/wp-json/swng-app/v1/chapterNames"
              );
              const data = await response.json();
              const names = Object.values(data);
              setChapterNames(names);
          } catch (error) {
              console.error(error);
          }
      }
      fetchChapterNames();
  }, []);

  React.useEffect(() => {
      async function fetchMemberNames() {
          try {
              if (selected) {
                  const response = await fetch(
                      `https://www.swng.org.au/wp-json/swng-app/v1/memberNames/${selected}`
                  );
                  const data = await response.json();
                  const names = Object.values(data).map((member) => member.name);
                  setMemberNames(names);
              } else {
                  setMemberNames([]);
              }
          } 
          catch (error) {
              console.error(error);
          }
      }
      fetchMemberNames();
  }, [selected]);

  const chapterData = chapterNames.slice(1).map((name, index) => ({
      key: index.toString(),
      value: name,
  }));

  const memberData = memberNames.map((name, index) => ({
      key: index.toString(),
      value: name,
  }));

  const handleSelectChapter = (selectedOption) => {
      const selectedChapterName = chapterData.find(
          (option) => option.key === selectedOption
      )?.value;
      setSelected(selectedChapterName);
  };

  const handleSelectMember = (selectedOption) => {
      const selectedMemberName = memberData.find(
          (option) => option.key === selectedOption
      )?.value;
  };

  return (
      <View style={styles.dropdown}>
          <View style={styles.chap_dropdown}>
            <Text style={styles.textboxAnchorText}>Select the Chapter:</Text>
            <SelectList data={chapterData} setSelected={handleSelectChapter} />
          </View>
          <View style={styles.mem_dropdown}>
            <Text style={styles.textboxAnchorText}>Select the Member:</Text>
            <SelectList data={memberData} setSelected={handleSelectMember} />
          </View>
      </View>
  );
};

// const for POST RAP data 
const postRap = async (subject, review, rating) => {

  const storedUserId = await SecureStore.getItemAsync('user_id');
  const end_point = 'https://www.swng.org.au/wp-json/swng-app/v1/rap';

  const data ={
    status_code: 200,
    status: 'success',
    message: 'Rap submitted'
  };
  if(storedUserId){
    data.user_id = storedUserId;
  }
  if(subject){
    data.subject = subject;
  }
  if(review){
    data.review = review;
  }
  if(rating){
    data.rating = rating;
  }
 
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
  body: JSON.stringify(data),
  };

  const response = await fetch(end_point, options);
  const result = await response.json();
  const alertMess = `Status Code: ${result.status_code}\nStatus: ${result.status}\nMessage: ${result.message}`;
  alert(alertMess);
  return result;
};

export default function RapPage() {

  const [isUpdated, setIsUpdated] = useState(false);
  const [subject, setsubject] = React.useState('');
  const [review, setreview] = React.useState('');
  const [rating, setrating] = React.useState('');

  const isAnyFieldEmpty = !subject || !review;
  const buttonBackgroundColor = isAnyFieldEmpty ? '#c11717' : '#ed3434';

  const updateinfo = async () => {
    const result = await postRap(subject, review, rating); //call postRap function
    console.log(result);

    setIsUpdated(true);
    setsubject('');
    setreview('');
    setrating('')
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} automaticallyAdjustKeyboardInsets={true}>

        <Chapters_Members/> 
        <Star/>

        <View style={styles.centeredContainer}>
        <TextInput placeholder="Enter subject" value={subject} onChangeText={text => setsubject(text)} style={styles.input}></TextInput>
        </View>
      
        <View style={styles.centeredContainer}>
        <TextInput placeholder="Enter your review..."  value={review} onChangeText={text => setreview(text)} style={styles.input1}></TextInput>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]} disabled={isAnyFieldEmpty} onPress={updateinfo}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
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