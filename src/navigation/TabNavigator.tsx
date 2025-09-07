// src/navigation/TabNavigator.tsx - Main bottom tab navigator

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVIGATION_ROUTES } from '../constants/config';
import { MainTabParamList } from './types';

// Import navigators (will be created)
// import { ChatNavigator } from './ChatNavigator';
// import { MachineNavigator } from './MachineNavigator';
// import { SettingsNavigator } from './SettingsNavigator';

// Temporary placeholder components
const PlaceholderScreen = ({ title }: { title: string }) => {
  const React = require('react');
  const { View, Text, StyleSheet } = require('react-native');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Navigation Ready!</Text>
    </View>
  );
};

const ChatNavigator = () => <PlaceholderScreen title="Chat" />;
const MachineNavigator = () => <PlaceholderScreen title="Machines" />;
const SettingsNavigator = () => <PlaceholderScreen title="Settings" />;

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_ROUTES.CHAT_TAB}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTES.CHAT_TAB}
        component={ChatNavigator}
        options={{
          tabBarLabel: 'Chat',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="chat" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.MACHINE_TAB}
        component={MachineNavigator}
        options={{
          tabBarLabel: 'Machines',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="settings" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.SETTINGS_TAB}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="person" size={size} color={color} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = require('react-native').StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
