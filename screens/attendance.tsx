import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { Text, View } from '../components/Themed';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import CheckTokenStatusOnPageLoad from "../components/checkTokenStatus";

import {
  getEventTitle,
} from './loading';
import * as SecureStore from "expo-secure-store";
import axios from "axios";



export default function AttendancePage() {
  CheckTokenStatusOnPageLoad();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [attendance, setAttendance] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    getStoredMemberNames();
  }, []);



  async function getStoredMemberNames() {
    try {
      const memberNamesString = await SecureStore.getItemAsync('memberNames');
      if (memberNamesString) {
        const memberNames = JSON.parse(memberNamesString);
        console.log(memberNames);
        setAttendance(memberNames);
        setCheckedItems(new Array(memberNames.length).fill(false));
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleToggleCheckbox = (index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = [...prevCheckedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      return updatedCheckedItems;
    });
  };

  const handleSubmit = () => {

    const validateToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
          navigation.navigate('Login');
          Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
        }
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Your-User-Agent',
          },
        });

        const response = await axiosInstance.post('https://swng.org.au/wp-json/jwt-auth/v1/token/validate');
        if (response.data.code === 'jwt_auth_valid_token' && response.data.data.status === 200) {
          console.log('Token is valid111');
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
          console.log('Token is Invalid111');
          Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
        }
      } catch (error) {
        navigation.navigate('Login');
        console.log("Token is error")
        Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
      }
    };

    validateToken()

  };

  return (
      <View style={styles.containerHead}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Attendance list for event</Text>
        <Text style={styles.subtitle}>{getEventTitle()}</Text>
        <ScrollView style={styles.scrollView}>
          {attendance.map((name, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.name}>{name}</Text>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => handleToggleCheckbox(index)}
                >
                  {checkedItems[index] && <View style={styles.checked} />}
                </TouchableOpacity>
              </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Attendance</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 50,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerHead: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#c11717',
  },
  name: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#c11717',
    width: '50%',
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
  subtitle: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 3,
    height: 1,
    width: '100%',
    top:15,
    marginBottom: 40,
  },
});