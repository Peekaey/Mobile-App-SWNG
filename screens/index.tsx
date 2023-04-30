
import { StyleSheet, Image, Linking } from 'react-native';
import { Text, View } from '../components/Themed';
const WordPressAPI = 'https://example.com/wp-json/wp/v2/posts?_embed&per_page=5';
import React, { useState, useEffect } from 'react';

import axios, { AxiosResponse, AxiosError } from 'axios';
import cheerio from 'cheerio';



import { CamdenChapter } from '../components/ChapterMeetingDetails';
import { CampbelltownChapter } from '../components/ChapterMeetingDetails';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
// Main Function - Needs to be exported so that the react-navigation can define and read the page



  
// Flag for the chapter to scrape
var Chapter = 'Camden'

// Chapter Webpage to Scrape
const url: string = `https://www.swng.org.au/chapters/${Chapter}/`;
const swngURL: string = 'https://www.swng.org.au/';

// Declaring Variables to Store Web Data









export default function IndexPage() {




  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title } > Upcoming Event </Text> 
      <Text style={styles.title } > {Chapter} Chapter </Text> 
      <GreyBox/>
      <RedBox/>


      </View> 





  );

}


const GreyBox = () => {
  const [eventTitle, seteventTitle] = useState('');
  const [eventDate, seteventDate] = useState('');
  const [venueText, setvenueText] = useState('');
  const [eventTimes, seteventTimes] = useState('');
  const [eventURL, seteventURL] = useState('');

  axios.get(url)
  .then((response: any) => {
    const html = response.data;
    const $ = cheerio.load(html);
    
      // Grabbing Event Title
      var eventTitle = $('div.columns div.column:first-child a:first-child').text();
      // console.log('Event Title: ' + eventTitle);
      seteventTitle(eventTitle);

      // Extracting event date
      var eventDate = $('div.columns div.column:first-child h3:first-of-type').text();
      // console.log('Event Date: ' + eventDate);
      seteventDate(eventDate);

      // Extracting venue information
      var venueText = $('div.columns div.column:first-child strong:contains("Venue:")')[0].nextSibling.nodeValue.trim();
      // console.log('Venue: ' + venueText);
      setvenueText(venueText);

      // Extracting Venue Time
      var eventTimes = $('div.column:nth-child(1) > h3:nth-child(2)').map((i, el) => {
        const time = $(el).next().text().trim().split(':')[1]; // extract the time from the element
        return time;
      }).get();
      // console.log('Event Time:' + eventTimes);
      seteventTimes(eventTimes.join(', '));

      // Extracting Event ReadMore
      const EventDetailsURL = $('div.column:nth-child(1) > a:nth-child(5)').attr('href');
      seteventURL(EventDetailsURL)

      console.log('EventURL' + EventDetailsURL)

    })
    .catch((error:any)=> {
      console.error(error);
    });


    const OpenEventDetails = () => {
      console.log('Called');
      Linking.openURL(eventURL);
    };


  return (
  <View style={styles.container}>
      <View style={styles.middleBox}>
        <Text style={styles.centeredBoxText}> {eventTitle} </Text>
        <Text style={styles.centeredBoxText}>{"\n"}Time: {eventTimes}:00  </Text>
        <Text style={styles.centeredBoxText}>Date: {eventDate}  </Text>
        <Text style={styles.centeredBoxText}>Venue: {venueText}  </Text>
      </View>
      <TouchableWithoutFeedback onPress={OpenEventDetails}>
      <Text style={styles.RightBoxText}>SEE MORE</Text>
      </TouchableWithoutFeedback>
      </View>
  );
};

const RedBox = () => {

  axios.get(swngURL)
  .then((response: any) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const CamdenpresidentText = $('.et_pb_blurb_8 > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)').text();
    const CamdenpresidentName = CamdenpresidentText.replace('President: ', '');


    const CamdenphoneText = $('.et_pb_blurb_8 > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)').text();
    const Camdenphone = CamdenphoneText.replace('Phone: ', '');


    console.log(CamdenpresidentName); // Output: John Doe

  

  })
  .catch((error:any)=> {
    console.error(error);
  });


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

  return (
    <View style={styles.bottomBox}>
    <View style={styles.gridRow}>
      <View style={styles.chapterContainer}>
        <TouchableWithoutFeedback onPress={OpenBrowserCamden}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
        </TouchableWithoutFeedback >
        <Text style={styles.chapterTitle}>CAMDEN CHAPTER
        President: {'\n'}
        David Young
        Phone: {'\n'}
        0450525005
        </Text>
 
      </View>
      <View style={styles.chapterContainer}>
      <TouchableWithoutFeedback onPress={OpenBrowserCampbelltown}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
      </TouchableWithoutFeedback>
        <Text style={styles.chapterTitle}>CAMPBELLTOWN CHAPTER
        President: {'\n'}
        Wendy White
        Phone: {'\n'}
        0409 228 149
        </Text>
      </View>
    </View>
    <View style={styles.gridRow}>
      <View style={styles.chapterContainer}>
        <TouchableWithoutFeedback onPress={OpenBrowserLiverpool}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
        </TouchableWithoutFeedback>
        <Text style={styles.chapterTitle}>LIVERPOOL CHAPTER
        President: {'\n'}
        Rolf Fuchs
        Phone: {'\n'}
        0404 840 506
        </Text>
      </View>
      <View style={styles.chapterContainer}>
        <TouchableWithoutFeedback onPress={OpenBrowserNarellan}>
        <Image style={styles.chapterArrow} source={require('../assets/arrow.png')} />
        </TouchableWithoutFeedback>
        <Text style={styles.chapterTitle}>NARELLAN CHAPTER
        President: {'\n'}
        Darrel Stenhouse
        Phone: {'\n'}
        0438 789 455
        </Text>
      </View>
    </View>
  </View>
  );
};


// More Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 31,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '50%',
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
  RightBoxText: {
    textAlign:'right',
    fontSize: 22 ,
    fontWeight: 'bold',
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
    backgroundColor: 'grey',
    marginHorizontal: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chapterArrow: {
    width: 20,
    height: 20,
    marginHorizontal: 5, // add some margin between arrow and title
    backgroundColor: 'transparent'
  },




});

