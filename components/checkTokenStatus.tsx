import { StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import { Text, View } from '../components/Themed';

import React, { useState, useEffect } from 'react';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import { Navigator } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from '../App';
import axios from 'axios';

import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons'; // Import the required icon library
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

export default function CheckTokenStatus() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
    useEffect(() => {
      const validateToken = async () => {
        try {
          const token = await SecureStore.getItemAsync('token');
          if (!token) {
            navigation.navigate('Login');
            return;
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
            console.log('Token is valid');
          } else {
            navigation.navigate('Login');
            Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
          }
        } catch (error) {
          navigation.navigate('Login');
          Alert.alert('Session Expired', 'Your session token is invalid or expired, please login again');
        }
      };
  
      validateToken();
    }, []);
  
    return null;
  }