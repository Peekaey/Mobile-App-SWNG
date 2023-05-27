// Modules and Stuff to work
// Need to refactor and remove thats unneeded in future
import { StyleSheet, Image, Linking } from 'react-native';
import { Text, View } from '../components/Themed';
const WordPressAPI = 'https://example.com/wp-json/wp/v2/posts?_embed&per_page=5';
import React, { useState, useEffect } from 'react';

import axios, { AxiosResponse, AxiosError } from 'axios';
import cheerio from 'cheerio';

import { TouchableOpacity} from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
// Main Function - Needs to be exported so that the react-navigation can define and read the page

import { Chapter, swngURL } from './loading';

// Import Event Details from loading page
import {
  getEventTitle,
  getEventDate,
  getVenueText,
  getEventTimes,
  getEventURL,
} from './loading';


// Main function
export default function IndexPage() {


  // Display page information - call several functions and variables for data

  return (
    <View style={styles.containerHead}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title } > Upcoming Event </Text> 
      <Text style={styles.title } > {Chapter} Chapter </Text> 
      <GreyBox/>
      <RedBox/>
      </View> 
  );

}

// Function for all event data in the center box
export const GreyBox = () => {
  
  // Grab event details
  const eventTitle = getEventTitle();
  const eventTimes = getEventTimes();
  const eventDate = getEventDate();
  const venueText = getVenueText();
  const eventURL = getEventURL();


  if (!eventTitle || !eventTimes || !eventDate || !venueText) {
    // Render loading state or return null
    return null;
  }

  console.log(eventTitle)
  console.log(eventTimes)
  console.log(eventDate)
  console.log(venueText)

  // Action to open EventURL in browser
  const OpenEventDetails = () => {
    console.log('Called');
    Linking.openURL(eventURL);
  };

  // Action for Apology button
  const ApologyButton = () => {
    console.log('HitTheApologyButton');

  };

  // Display content in center box
  return (
  <View style={styles.containerBody}>
      <View style={styles.middleBox}>
        <Text style={styles.centeredBoxText}> {eventTitle} </Text>
        <Text style={styles.centeredBoxText}>{"\n"}Time: {eventTimes}:00  </Text>
        <Text style={styles.centeredBoxText}>Date: {eventDate}  </Text>
        <Text style={styles.centeredBoxText}>Venue: {venueText}  </Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableWithoutFeedback onPress={OpenEventDetails}>
      <Text style={styles.LeftBoxText}>SEE MORE</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={ApologyButton}>
      <Text style={styles.RightBoxText}>Apology</Text>
      </TouchableWithoutFeedback>
      </View>
      </View>
  );
};

// Function to display content in bottom of screen
const RedBox = () => {


  // Actions to open each chapters page

  const OpenBrowserCamden = () => {
    console.log('Called');
    Linking.openURL('https://www.swng.org.au/chapters/camden/');
  };
  const OpenBrowserCampbelltown = () => {
    console.log('Called');
    Linking.openURL('https://www.swng.org.au/chapters/campbelltown');
  };
  const OpenBrowserLiverpool = () => {
    console.log('Called');
    Linking.openURL('https://www.swng.org.au/chapters/liverpool');
  };
  const OpenBrowserNarellan = () => {
    console.log('Called');
    Linking.openURL('https://www.swng.org.au/chapters/narellan');
  };

  // Displays red box info

  return (
    <View style={styles.bottomBox}>
        <Text style={[styles.contactText, { textAlignVertical: 'top' }]}> Contact SWNG! </Text>
    <View style={styles.gridRow}>
      <View style={styles.chapterContainer}>
        <TouchableWithoutFeedback onPress={OpenBrowserCamden}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
        </TouchableWithoutFeedback >
        <Text style={styles.chapterTitle}>CAMDEN {'\n'}
        President: {'\n'}
        David Young {'\n'}
        Phone: {'\n'}
        0450525005 {'\n'}
        </Text>
 
      </View>
      <View style={styles.chapterContainer}>
      <TouchableWithoutFeedback onPress={OpenBrowserCampbelltown}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
      </TouchableWithoutFeedback>
        <Text style={styles.chapterTitle}>CAMPBELLTOWN {'\n'}
        President: {'\n'}
        Wendy White {'\n'}
        Phone: {'\n'}
        0409 228 149 {'\n'}
        </Text>
      </View>
    </View>
    <View style={styles.gridRow}>
      <View style={styles.chapterContainer}>
        <TouchableWithoutFeedback onPress={OpenBrowserLiverpool}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
        </TouchableWithoutFeedback>
        <Text style={styles.chapterTitle}>LIVERPOOL {'\n'}
        President: {'\n'}
        Rolf Fuchs {'\n'}
        Phone: {'\n'}
        0404 840 506
        </Text>
      </View>
      <View style={styles.chapterContainer}>
        <TouchableWithoutFeedback onPress={OpenBrowserNarellan}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
        </TouchableWithoutFeedback>
        <Text style={styles.chapterTitle}>NARELLAN {'\n'}
        President: {'\n'}
        Darrel Stenhouse {'\n'}
        Phone: {'\n'}
        0438 789 455 {'\n'}
        </Text>
        <Text>
          
        </Text>
      </View>
    </View>
  </View>
  );
};


// Page Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerHead: {
    flex: 1,
    alignItems: 'center',
  },
  containerBody: {

  },
  title: {
    fontSize: 31,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '50%',
    backgroundColor: 'white',
  },
  
  middleBox: {
    width: 300,
    height: 250,
    backgroundColor: '#cccccc', // change this to your preferred shade of grey
    alignItems: 'center',
  },
  centeredBoxText: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  LeftBoxText: {
    textAlign:'left',
    fontSize: 22 ,
    fontWeight: 'bold',
  },
  RightBoxText: {
    textAlign:'left',
    fontSize: 22,
    fontWeight: 'bold',
    // backgroundColor: '#d93b39', // change this to your preferred shade of grey
    color: 'red',
  },

  gridItemBodyText: {
    flexBasis: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    margin: 5,
    paddingLeft: 10,

  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    backgroundColor: '#d93b39', // change this to your preferred shade of grey
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    MarginTop: 100
  },
  gridRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d93b39',
    marginBottom: 10, // add some margin between rows
  },
  chapterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // add some margin between containers
    backgroundColor: '#d93b39', // change this to your preferred shade of grey
  },
  chapterTitle: {
    flexBasis: '80%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chapterBody: {
    flexBasis: '80%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontSize: 13,
  },
  chapterArrow: {
    width: 20,
    height: 20,
    marginHorizontal: 5, // add some margin between arrow and title
    backgroundColor: 'transparent'
  },
  contactText: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,

    backgroundColor: '#fff',
    zIndex: 1,

  }


});

