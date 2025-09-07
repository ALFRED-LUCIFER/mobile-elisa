// src/navigation/AuthNavigator.tsx - Authentication flow navigator

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION_ROUTES } from '../constants/config';
import { AuthStackParamList } from './types';

// Import screens
import { LoginScreen } from '../screens/auth/LoginScreen';
// import { RegisterScreen } from '../screens/auth/RegisterScreen';
// import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

// Temporary placeholder components for Register and ForgotPassword
const PlaceholderScreen = ({ title }: { title: string }) => {
  const React = require('react');
  const { View, Text, StyleSheet } = require('react-native');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Coming Soon...</Text>
    </View>
  );
};

const RegisterScreen = () => <PlaceholderScreen title="Register Screen" />;
const ForgotPasswordScreen = () => <PlaceholderScreen title="Forgot Password Screen" />;

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION_ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen
        name={NAVIGATION_ROUTES.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.REGISTER}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const styles = require('react-native').StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});
