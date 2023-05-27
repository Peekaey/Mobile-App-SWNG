// TO DO
// - Update and change storedUserId variable to storedUserURL


// Modules and Stuff to work
// Need to refactor and remove thats unneeded in future
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
import { TouchableWebElement } from '@ui-kitten/components/devsupport';
import { Icon, IconElement, TopNavigationAction , TopNavigation, IconRegistry, IconProps,} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';


// Import each new screen when it is created so the navigator can read it
import LoginScreen from './screens/login';
import IndexPage from './screens/index';
import ReferralsPage from './screens/referrals';
import AttendancePage from './screens/attendance';
import RapPage from './screens/rap';
import ProfilePage from './screens/profile';
import LoadingPage from './screens/loading';
import CheckTokenStatus from './components/checkTokenStatus';


// Pages for the navigation to be able to navigate to
export const homeRoutes = [
  { name: 'Loading', component: LoadingPage },
  { name: 'Login', component: LoginScreen },
  { name: 'Home', component: IndexPage },
  { name: 'Profile', component: ProfilePage },
  { name: 'Rap', component: RapPage },
  { name: 'Referrals', component: ReferralsPage },
  { name: 'Attendance', component: AttendancePage },


];


// Grabs Members Avatar during login
let storedUserId: any;

async function getAvatar() {
  storedUserId = await SecureStore.getItemAsync('avatarURL');

  if (storedUserId === null) {
    console.log('The stored avatar URL is null.');
    storedUserId = '../Mobile-App-SWNG/assets/user-avatar.png';
  } else {
    console.log('The stored avatar URL is:', storedUserId);
  }
}



// Creates the bottom navigation bar
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

          // Icons for each route
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
        // Tab Bar settings
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#c11717',
        tabBarInactiveTintColor: 'white',

        tabBarStyle: {
        // Hides the bottom navigation bar for the Login and Loading Page
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

// Creating Top Navigation Bar
export const TopNavigationSimpleUsageShowcase = ({navigation, route}: any) => {


  // Gets current page and doesn't display top navbar if any of the below
  const currentPage = route?.name;

  if (!route || !currentPage || currentPage === 'Loading') {
    return null;
  }

  if (!route || !currentPage || currentPage === 'Login') {
    return null;
  }

  // Returns and displays the navbar
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

// Components of the app - incldues all dependencies as well as bottom/top navbars
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
