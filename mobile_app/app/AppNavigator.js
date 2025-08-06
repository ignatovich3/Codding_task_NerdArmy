// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './login';
import RegisterScreen from './register';
import FlowerListScreen from './FlowerListScreen';
import FlowerFormScreen from './FlowerFormScreen';
import HomeScreen from './(tabs)/index';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Flowers" component={FlowerListScreen} />
        <Stack.Screen name="AddFlower" component={FlowerFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
