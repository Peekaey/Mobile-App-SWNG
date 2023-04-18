
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
const WordPressAPI = 'https://example.com/wp-json/wp/v2/posts?_embed&per_page=5';


import axios, { AxiosResponse, AxiosError } from 'axios';
import cheerio from 'cheerio';



import { CamdenChapter } from '../components/ChapterMeetingDetails';
import { CampbelltownChapter } from '../components/ChapterMeetingDetails';
// Main Function - Needs to be exported so that the react-navigation can define and read the page

export default function IndexPage() {

// Flag for the chapter to scrape
var Chapter = 'campbelltown'

// Chapter Webpage to Scrape
const url: string = `https://www.swng.org.au/chapters/${Chapter}/`;

axios.get(url)
.then((response: any) => {
  const html = response.data;
  const $ = cheerio.load(html);
  
    // Grabbing Event Title
    const firstHref = $('div.columns div.column:first-child a:first-child').text();
    console.log('Event Title: ' + firstHref);

    // Extracting event date
    const eventDate = $('h3').text().trim();
    const firstH3Text = $('div.columns div.column:first-child h3:first-of-type').text();
    console.log('Event Date: ' + firstH3Text);

    // Extracting venue information
    const venueText = $('div.columns div.column:first-child strong:contains("Venue:")')[0].nextSibling.nodeValue.trim();
    console.log('Venue: ' + venueText);

    // Extracting Venue Time
    const eventTimes = $('div.column:nth-child(1) > h3:nth-child(2)').map((i, el) => {
      const time = $(el).next().text().trim().split(':')[1]; // extract the time from the element
      return time;
    }).get();
    console.log('Event Time:' + eventTimes);
  })
  .catch((error:any)=> {
    console.error(error);
  });





  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style  = {styles.image
      } source={require('../assets//thumbnail_SWNG-white.png')} />

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