import { StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, KeyboardAvoidingView, } from 'react-native';

import { Text, View } from '../components/Themed';
import logo from '../assets/favicon.png'
import React, { useState } from 'react';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
import { Navigator } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from '../App';

export function CamdenChapter() {
    return(
    <Text> CamdenChapter Details</Text>
    )
}

export function CampbelltownChapter() {
    return (
    <Text> Campbelltown Chapter Details</Text>
    )
}