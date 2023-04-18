
import { StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry } from '@ui-kitten/components';

// Import each new screen when it is created so the navigator can read it
import LoginScreen from './screens/login';
import IndexPage from './screens/index';
import ReferralsPage from './screens/referrals';
import AttendancePage from './screens/attendance';
import RapPage from './screens/rap';

const Tab = createBottomTabNavigator();
// Function underneath is the styling of the bottom navigation bar, including icons
const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,4)}}></BottomTabBar>}
      initialRouteName='LoginPage'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          // Only Uncomment for Easy Debugging
          if (route.name === 'LoginPage') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          if (route.name === 'IndexPage') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'ReferralsPage') {
            iconName = focused ? 'star' : 'star-outline';
          }
          if (route.name === 'AttendancePage') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
        // Hides the bottom navigation bar for the LoginPage screen
          display: route.name === 'LoginPage' ? 'none' : 'flex',
        },
        // Removes the screen from the navigation bar - include the page name for each new screen that you don't want the nav bar
        tabBarButton: [
          'LoginPage'
        ].includes(route.name)
        ? () => {
          return null;
        }
        : undefined,
      })}>

       {/* Navigation component - each new screen will need to be defined here for the router to be able to navigate to that screen */}
      <Tab.Screen name='LoginPage' component={LoginScreen} options={{ headerShown: false}} />
      <Tab.Screen name='IndexPage' component={IndexPage} options={{ headerShown: false}} />
      <Tab.Screen name='ReferralsPage' component={ReferralsPage} options={{ headerShown: false}}/>
      <Tab.Screen name='AttendancePage' component={AttendancePage} options={{ headerShown: false}}/>
      <Tab.Screen name='RapPage' component={RapPage} options={{ headerShown: false}} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Layout style={{ flex: 1 }}>
            <HomeTabs />
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});