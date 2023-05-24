
import { StyleSheet, Image, View, Text, Platform, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import each new screen when it is created so the navigator can read it
import LoginScreen from './screens/login';
import IndexPage from './screens/index';
import ReferralsPage from './screens/referrals';
import AttendancePage from './screens/attendance';
import RapPage from './screens/rap';
import ProfilePage from './screens/profile';
import LoadingPage from './screens/loading';
import { TouchableWebElement } from '@ui-kitten/components/devsupport';
import { Icon, IconElement, TopNavigationAction , TopNavigation, IconRegistry, IconProps,} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';


import 'firebase/auth';
import 'firebase/firestore';
import * as Notifications from 'expo-notifications';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVV130ZzKxahIADAkRlSjz1I4KbN0pqTA",
  authDomain: "swngandroidapp.firebaseapp.com",
  projectId: "swngandroidapp",
  storageBucket: "swngandroidapp.appspot.com",
  messagingSenderId: "1090721082574",
  appId: "1:1090721082574:web:32d97de7f8bcfccf4cb49f",
  measurementId: "G-K4N1C5YQQ2"
};
firebase.initializeApp(firebaseConfig);


// Configure Expo Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Get the user's Expo push token for FCM registration
const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to obtain push token');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push token:', token);

  // Store the token on your server or use it to send push notifications
};

// Register for push notifications
registerForPushNotificationsAsync();





export const homeRoutes = [
  { name: 'Loading', component: LoadingPage },
  { name: 'Login', component: LoginScreen },
  { name: 'Home', component: IndexPage },
  { name: 'Profile', component: ProfilePage },
  { name: 'Rap', component: RapPage },
  { name: 'Referrals', component: ReferralsPage },
  { name: 'Attendance', component: AttendancePage },


];


var storedUserId:any;

async function getAvatar() {
  storedUserId = await AsyncStorage.getItem('avatarURL');

  if (storedUserId === null) {
    console.log('The stored avatar URL is null.');
    storedUserId = '../Mobile-App-SWNG/assets/user-avatar.png';
  } else {
    console.log('The stored avatar URL is:', storedUserId);
  }
}



const Tab = createBottomTabNavigator();
// Function underneath is the styling of the bottom navigation bar, including icons
const HomeTabs = () => {

  getAvatar();


  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,7)}}></BottomTabBar>}
      initialRouteName='Login'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          // Only Uncomment for Easy Debugging
          if (route.name === 'Login') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';

          }
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'Rap') {
            iconName = focused ? 'star' : 'star-outline';
          }
          if (route.name === 'Referrals') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          if (route.name === 'Attendance') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }


          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#c11717',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
        // Hides the bottom navigation bar for the LoginPage screen
          display: (route.name === 'Login' || route.name === 'Loading') ? 'none' : 'flex',
          backgroundColor: 'grey'
        },
        
        // Removes the screen from the navigation bar - include the page name for each new screen that you don't want the nav bar
        tabBarButton: [
          'Loading',
          'Login',
          'Profile',

        ].includes(route.name)
        ? () => {
          return null;
        }
        : undefined,
      })
      }>
{homeRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{ 
            header: ({ navigation, route }) => (
              <TopNavigationSimpleUsageShowcase navigation={navigation} route={route} />
            ),
            headerShown: true,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};



export const TopNavigationSimpleUsageShowcase = ({navigation, route}: any) => {



  const currentPage = route?.name;

  if (!route || !currentPage || currentPage === 'Loading') {
    return null;
  }

  if (!route || !currentPage || currentPage === 'Login') {
    return null;
  }


  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={require('../Mobile-App-SWNG/assets/thumbnail_SWNG-transparent.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
          {storedUserId ? (
            <Image source={{ uri: storedUserId }} style={styles.avatar} />
          ) : (
            <Image
              source={require('../Mobile-App-SWNG/assets/user-avatar.png')}
              style={styles.avatar}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Layout style={{ flex: 1 }}>
          <TopNavigationSimpleUsageShowcase />
            <HomeTabs  />
          </Layout>
        </NavigationContainer>
      </ApplicationProvider>
    </React.Fragment>
  );
};


export default App;

// Page Styling
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 10

  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },   
  
  
});
