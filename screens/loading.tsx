
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Animated, Easing } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation, ParamListBase, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import cheerio from 'cheerio';
import { GreyBox } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Flag for the chapter to scrape
export var Chapter = 'Camden'

// Chapter Webpage to Scrape
export const url: string = `https://www.swng.org.au/chapters/${Chapter}/`;
export const swngURL: string = 'https://www.swng.org.au/';

let eventTitle = '';
let eventDate = '';
let venueText = '';
let eventTimes: any ;
let eventURL = '';

export function setEventTitle(title:any) {
  eventTitle = title;
}

export function setEventDate(date:any) {
  eventDate = date;
}

export function setVenueText(venue:any) {
  venueText = venue;
}

export function setEventTimes(times:any) {
  eventTimes = times;
}

export function setEventURL(url:any) {
  eventURL = url;
}

export function getEventTitle() {
  return eventTitle;
}

export function getEventDate() {
  return eventDate;
}

export function getVenueText() {
  return venueText;
}

export function getEventTimes() {
  return eventTimes;
}

export function getEventURL() {
  return eventURL;
}



export async function BackEndLoading() {

  axios.get(url)
  .then((response: any) => {
    const html = response.data;
    const $ = cheerio.load(html);
    
      // Grabbing Event Title
      setEventTitle( $('div.columns div.column:first-child a:first-child').text());
      // console.log('Event Title: ' + eventTitle);
      
      // Extracting event date
       setEventDate($('div.columns div.column:first-child h3:first-of-type').text());
      // console.log('Event Date: ' + eventDate);


      // Extracting venue information
      setVenueText($('div.columns div.column:first-child strong:contains("Venue:")')[0].nextSibling.nodeValue.trim());      // console.log('Venue: ' + venueText);


      // Extracting Venue Time
      setEventTimes($('div.column:nth-child(1) > h3:nth-child(2)').map((i, el) => {
        const time = $(el).next().text().trim().split(':')[1];
        return time;
      }).get());
      setEventURL($('div.column:nth-child(1) > a:nth-child(5)').attr('href'));


      console.log('EventURL' + getEventURL())

    })
    .catch((error:any)=> {
      console.error(error);
    });

    // Grabbing User URL
    const storedUserId = await AsyncStorage.getItem('user_id');
    const storedToken = await AsyncStorage.getItem('token');

    console.log ("LOADING SCREEN STORED USER ID", storedUserId)

// Set the Authorization header with the bearer token
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${storedToken}`,
  },
});


// Make a GET request to the specific user's endpoint
axiosInstance.get(`https://swng.org.au/wp-json/wp/v2/users/${storedUserId}`)
  .then(response => {
    const avatarUrl = response.data.avatar_urls['96']; // Access the desired avatar URL

    AsyncStorage.setItem('avatarURL', avatarUrl);
  })
  .catch(error => {
    console.error('Error retrieving user data:', error);
  });

  const storedavatarURL = await AsyncStorage.getItem('avatarURL')
  console.log(storedavatarURL);
}



interface LoadingPageProps {
  // Define the types for any props that your component will receive
}
export default function LoadingPage(props: LoadingPageProps) {

  // Navigator Stuff
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await BackEndLoading();
      setLoading(false);
    };

    fetchData();
  }, []);


  const spinValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    spin();
  }, []);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 2,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      });
    });
  };

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const transformStyle = { transform: [{ rotate: spinAnimation }, { scale: scaleValue }] };

  if (loading) {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.logo, transformStyle]}
          source={require('../assets/thumbnail_SWNG-white.png')}
        />
      </View>
    );
  }

  // Render the actual content once the loading is done

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, transformStyle]}
        source={require('../assets/thumbnail_SWNG-white.png')}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
    separator: {
    marginVertical: 30,
    height: 1,
    width: '50%',
  },
    image: {
    marginTop: '5%',
    marginBottom: '5%',
    resizeMode: 'contain',
    height: '20%',
    width: '80%'
    
  },
});


