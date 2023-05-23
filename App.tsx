
import { StyleSheet, Image, View, Text, Platform, TouchableOpacity, AppRegistry} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
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

import firebase from '@react-native-firebase/app';
import { expo } from './app.json';
import messaging from '@react-native-firebase/messaging';
import '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';

import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@react-native-firebase/messaging';





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



const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


const App = () => {
  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig); // Provide your Firebase configuration object here
    }

    // Request permission for receiving push notifications
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        // Handle notifications when the app is in the foreground
        Notifications.addNotificationReceivedListener((notification) => {
          console.log('Notification received:', notification);
        });

        // Handle notifications when the app is in the background or closed
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log('Notification response received:', response);
        });
      }
    });

    // Initialize Firebase messaging
    const messaging = firebase.messaging();

    // Handle background messages
    messaging.setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView>
          <NavigationContainer>
            <Layout style={{ flex: 1 }}>
              <TopNavigationSimpleUsageShowcase />
              <HomeTabs />
            </Layout>
          </NavigationContainer>
        </SafeAreaView>
      </ApplicationProvider>
    </React.Fragment>
  );
};

registerRootComponent(App);

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
