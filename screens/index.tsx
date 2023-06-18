// Modules to work

import { StyleSheet, Image, Linking } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import scheduledNotification from "../components/scheduledNotification";
import CheckTokenStatusOnPageLoad from "../components/checkTokenStatus";
import * as SecureStore from "expo-secure-store";
import { Chapter} from './loading';
import TestInAppNotification from "../components/scheduledNotification";

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
  // Sets Notification to run
  TestInAppNotification();
  // Checks if stored token status is invalid on page load
  CheckTokenStatusOnPageLoad();

  // Returns Page
  // Greybox contains event information
  // Redbox contains bottom of the page chapter links

  return (
    <View style={styles.containerHead}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title } > Upcoming Event </Text> 
      <Text style={styles.title } > {Chapter}  </Text>
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

  // Action to open EventURL in browser
  const OpenEventDetails = () => {
    console.log('Called');
    Linking.openURL(eventURL);
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
      <Text style={styles.RightBoxText}>Submit Apology</Text>
      </TouchableWithoutFeedback>
      </View>
      </View>
  );
};


const ApologyButton = () => {
  const event = getEventTitle();
  const eventdate = getEventDate();
  console.log('HitTheApologyButton');

  const subject = `UNAVAILABLE for upcoming event: ${event} `;
  const body = `Hey, hope you are well. Unfortunately, I will not be able to attend the upcoming event: ${event} on the ${eventdate}.`;

  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  Linking.openURL(mailtoLink)
      .then(() => {
        console.log('Email app opened successfully');
      })
      .catch((error) => {
        console.error('Error opening email app:', error);
      });
};


// Function to display more information for each chapter
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
        <Text style={[styles.contactText, { textAlignVertical: 'top' }]}> Website Homepages </Text>
        <View style={styles.gridRow}>
          <View style={styles.chapterContainer}>
            <TouchableWithoutFeedback onPress={OpenBrowserCamden}>
              <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
            </TouchableWithoutFeedback >
            <Text style={styles.chapterTitle}> {'\n'}
              CAMDEN {'\n'}
              Chapter {'\n'}

            </Text>

          </View>
          <View style={styles.chapterContainer}>
            <TouchableWithoutFeedback onPress={OpenBrowserCampbelltown}>
              <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.chapterTitle}> {'\n'}
              CAMPBELLTOWN {'\n'}
              Chapter {'\n'}
            </Text>
          </View>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.chapterContainer}>
            <TouchableWithoutFeedback onPress={OpenBrowserLiverpool}>
              <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.chapterTitle}> {'\n'}
              LIVERPOOL {'\n'}
              Chapter {'\n'}
            </Text>
          </View>
          <View style={styles.chapterContainer}>
            <TouchableWithoutFeedback onPress={OpenBrowserNarellan}>
              <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.chapterTitle}> {'\n'}
              NARELLAN {'\n'}
              Chapter {'\n'}
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
    width: '100%',
  },
  
  middleBox: {
    width: 300,
    height: 250,
    borderRadius: 10,
    resizeMode: 'cover',

    backgroundColor: '#cccccc',
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
    backgroundColor: '#d93b39',
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
    marginBottom: 10,
  },
  chapterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#d93b39',
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
    fontSize: 15,

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
    marginHorizontal: 5,
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

