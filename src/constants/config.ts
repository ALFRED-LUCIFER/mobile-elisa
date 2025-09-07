// src/constants/config.ts - App configuration

export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api' 
    : 'https://api.lisa-app.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const RAG_CONFIG = {
  WEBSOCKET_URL: __DEV__ 
    ? 'ws://localhost:3001' 
    : 'wss://rag.lisa-app.com',
  MAX_CONTEXT_LENGTH: 4000,
  RESPONSE_TIMEOUT: 30000,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@lisa_auth_token',
  USER_DATA: '@lisa_user_data',
  THEME_PREFERENCE: '@lisa_theme',
  CHAT_HISTORY: '@lisa_chat_history',
  MACHINE_DATA: '@lisa_machine_data',
  APP_SETTINGS: '@lisa_app_settings',
};

export const NAVIGATION_ROUTES = {
  // Auth Stack
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main Tab Navigator
  CHAT_TAB: 'ChatTab',
  MACHINE_TAB: 'MachineTab',
  SETTINGS_TAB: 'SettingsTab',
  
  // Chat Stack
  CHAT_LIST: 'ChatList',
  CHAT_SCREEN: 'ChatScreen',
  CHAT_SETTINGS: 'ChatSettings',
  
  // Machine Stack
  MACHINE_LIST: 'MachineList',
  MACHINE_DETAIL: 'MachineDetail',
  MAINTENANCE_SCREEN: 'MaintenanceScreen',
  ADD_MACHINE: 'AddMachine',
  
  // Settings Stack
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  PREFERENCES: 'Preferences',
  ABOUT: 'About',
} as const;

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  MESSAGE_MAX_LENGTH: 1000,
};

export const PERMISSIONS = {
  CAMERA: 'camera',
  PHOTO_LIBRARY: 'photo',
  MICROPHONE: 'microphone',
  LOCATION: 'location',
  NOTIFICATIONS: 'notification',
} as const;

export const APP_INFO = {
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  APP_NAME: 'LISA',
  SUPPORT_EMAIL: 'support@lisa-app.com',
  PRIVACY_POLICY_URL: 'https://lisa-app.com/privacy',
  TERMS_URL: 'https://lisa-app.com/terms',
};
