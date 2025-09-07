// src/navigation/types.ts - Navigation type definitions

import { NAVIGATION_ROUTES } from '../constants/config';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  [NAVIGATION_ROUTES.LOGIN]: undefined;
  [NAVIGATION_ROUTES.REGISTER]: undefined;
  [NAVIGATION_ROUTES.FORGOT_PASSWORD]: undefined;
};

export type MainTabParamList = {
  [NAVIGATION_ROUTES.CHAT_TAB]: undefined;
  [NAVIGATION_ROUTES.MACHINE_TAB]: undefined;
  [NAVIGATION_ROUTES.SETTINGS_TAB]: undefined;
};

export type ChatStackParamList = {
  [NAVIGATION_ROUTES.CHAT_LIST]: undefined;
  [NAVIGATION_ROUTES.CHAT_SCREEN]: {
    conversationId?: string;
    title?: string;
  };
  [NAVIGATION_ROUTES.CHAT_SETTINGS]: {
    conversationId: string;
  };
};

export type MachineStackParamList = {
  [NAVIGATION_ROUTES.MACHINE_LIST]: undefined;
  [NAVIGATION_ROUTES.MACHINE_DETAIL]: {
    machineId: string;
  };
  [NAVIGATION_ROUTES.MAINTENANCE_SCREEN]: {
    machineId: string;
    taskId?: string;
  };
  [NAVIGATION_ROUTES.ADD_MACHINE]: undefined;
};

export type SettingsStackParamList = {
  [NAVIGATION_ROUTES.SETTINGS]: undefined;
  [NAVIGATION_ROUTES.PROFILE]: undefined;
  [NAVIGATION_ROUTES.PREFERENCES]: undefined;
  [NAVIGATION_ROUTES.ABOUT]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
