
// Modules and Stuff to work
import { StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View } from '../components/Themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation, ParamListBase, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import cheerio from 'cheerio';
import * as SecureStore from 'expo-secure-store';
import SWNGLogoWhite from '../assets/SWNGWhiteLogo.png'

// Flag for the chapter to scrape
export var Chapter = 'Liverpool'


// Setters and Getters for Event Information for Index Page
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


// Grabs the stored chapter from login and retrieves it
export async function GrabChapter() {
  try {
    Chapter = await SecureStore.getItemAsync('chapter');
    return Chapter;
  } catch (error) {
    console.log('Error retrieving Chapter:', error);
    return null;
  }
}


// Main function
export async function BackEndLoading() {

await GrabChapter();

  // Scrapes SWNG Website for appropriate event information

  axios.get(`https://www.swng.org.au/chapters/${Chapter}/`)
  .then((response: any) => {
    const html = response.data;
    const $ = cheerio.load(html);

      // Grabbing event Title
      setEventTitle( $('div.columns div.column:first-child a:first-child').text());

      // console.log('Event Title: ' + eventTitle);

      // Extracting event date
       setEventDate($('div.columns div.column:first-child h3:first-of-type').text());
      // console.log('Event Date: ' + eventDate);

      // Extracting venue information
      setVenueText($('div.columns div.column:first-child strong:contains("Venue:")')[0].nextSibling.nodeValue.trim());      // console.log('Venue: ' + venueText);

      // Extracting event times
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

    // Grabbing stored UserID as well as Login Token
    const storedToken = await SecureStore.getItemAsync('token');
    const storedUserId = await SecureStore.getItemAsync('user_id');

// Set the Authorization header with the bearer token
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${storedToken}`,
  },
});

// fetching member's saved avatar through Wordpress API
const fetchAndStoreAvatar = async (storedUserId:any) => {
  try {
    const response = await axiosInstance.get(`https://swng.org.au/wp-json/wp/v2/users/${storedUserId}`);

    const avatarUrl = response.data.avatar_urls['96'];
    await SecureStore.setItemAsync('avatarURL', avatarUrl);
    const name = response.data.name;
    await SecureStore.setItemAsync('userName', name);
  } catch (error) {
    console.error('Error retrieving user data:', error);
  }
};

// fetching list of members for the chapter that the user is assigned to - make attendace page preload data
  async function fetchmembers() {
    try {
      const response = await fetch(
          `https://www.swng.org.au/wp-json/swng-app/v1/memberNames/${Chapter}`
      );
      const data = await response.json();
      const memberNames = Object.values(data).map((member:any) => member.name);
      await SecureStore.setItemAsync('memberNames', JSON.stringify(memberNames));
    } catch (error) {
      console.error(error);
    }
  }

// Call the function and stored list of members in the same chapter as the user
await fetchmembers();
// Call the function and store member avatar's URL in secure storage
await fetchAndStoreAvatar(storedUserId);

}

// Avoiding errors with typescript prompts
interface LoadingPageProps {
  // Define the types for any props that your component will receive
}


// Default function for the LoadingPage
export default function LoadingPage(props: LoadingPageProps) {

  // Declaring Navigation dependencies to navigate to index page
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

  // State Variable to prevent navigation to index page unless event data is grabbed.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await BackEndLoading();
      setLoading(false); // Once all the day has been gathered, set loading to be finished and render the final animation
    };

    fetchData();
  }, []);


  // Animation related code for the spinning SWNG logo
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
          source={SWNGLogoWhite}
        />
      </View>
    );
  }

  // Render the actual content once the loading is done

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, transformStyle]}
        source={SWNGLogoWhite}
      />
    </View>
  );
}


// Styling for the page
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


