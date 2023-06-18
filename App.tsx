
// Modules to import
import { StyleSheet, Image, View , TouchableOpacity} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconRegistry} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import SWNGLogo from './assets/SWNGTransparentLogo.png'
import userAvatar from './assets/userAvatar.png'
import { LogBox } from "react-native"

// Import each new screen when it is created so the navigator can read it
import LoginScreen from './screens/login';
import IndexPage from './screens/index';
import ReferralsPage from './screens/referrals';
import AttendancePage from './screens/attendance';
import RapPage from './screens/rap';
import ProfilePage from './screens/profile';
import LoadingPage from './screens/loading';
import {useEffect , useState} from 'react';

// Hides the logs from appearing in expo previewer - reading errors from terminal instead
LogBox.ignoreAllLogs(true)


// Initialises the bottom navigation bar
const Tab = createBottomTabNavigator();


// Pages for the navigation to be able to navigate to - add an additional page to the array after importing a new page
const homeRoutes = [
    { name: 'Loading', component: LoadingPage },
    { name: 'Login', component: LoginScreen },
    { name: 'Home', component: IndexPage },
    { name: 'Profile', component: ProfilePage },
    { name: 'Rap', component: RapPage },
    { name: 'Referrals', component: ReferralsPage },
    { name: 'Attendance', component: AttendancePage },
];


// Hometabs const is the styling of the bottom navigation bar, including icons
export const HomeTabs = () => {
    return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,7)}}></BottomTabBar>}
      initialRouteName='Login' // Sets initial startup page
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
                    // Initialising the top navigation bar
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



// Grabs Members Avatar during login
async function getAvatar() {
  let storedUserId = await SecureStore.getItemAsync('avatarURL');
  return storedUserId || '../Mobile-App-SWNG/assets/user-avatar.png';
}

// Creating Top Navigation Bar
export const TopNavigationSimpleUsageShowcase = ({ navigation, route }: any) => {

    const [avatarSource, setAvatarSource] = useState<string | undefined>(undefined);

    // Sets avatar to display - If null then displays default picture
  useEffect(() => {
    getAvatar().then((avatarUrl) => {
      setAvatarSource(avatarUrl);
    });
  }, []);

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
        <Image source={SWNGLogo} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
          {avatarSource ? (
            <Image source={{ uri: avatarSource }} style={styles.avatar} />
          ) : (
            <Image source={userAvatar} style={styles.avatar} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Components of the app - includes all dependencies as well as bottom/top navigation bars
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
