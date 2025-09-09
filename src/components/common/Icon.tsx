// src/components/common/Icon.tsx - Unified icon component for LISA app

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';

// Icon library types
type IconLibrary = 'MaterialCommunity' | 'Material' | 'Feather' | 'AntDesign';

// Predefined icon mappings for LISA app
const LISA_ICONS = {
  // Chat icons
  'chat-send': { library: 'MaterialCommunity' as IconLibrary, name: 'send-circle' },
  'chat-attach': { library: 'MaterialCommunity' as IconLibrary, name: 'paperclip' },
  'chat-voice': { library: 'MaterialCommunity' as IconLibrary, name: 'microphone' },
  'chat-message': { library: 'MaterialCommunity' as IconLibrary, name: 'message-text' },
  'chat-typing': { library: 'MaterialCommunity' as IconLibrary, name: 'dots-horizontal' },
  
  // Navigation icons
  'menu': { library: 'MaterialCommunity' as IconLibrary, name: 'menu' },
  'back': { library: 'MaterialCommunity' as IconLibrary, name: 'arrow-left' },
  'close': { library: 'MaterialCommunity' as IconLibrary, name: 'close' },
  'home': { library: 'MaterialCommunity' as IconLibrary, name: 'home' },
  
  // Status icons
  'online': { library: 'MaterialCommunity' as IconLibrary, name: 'wifi' },
  'offline': { library: 'MaterialCommunity' as IconLibrary, name: 'wifi-off' },
  'success': { library: 'MaterialCommunity' as IconLibrary, name: 'check-circle' },
  'error': { library: 'MaterialCommunity' as IconLibrary, name: 'alert-circle' },
  'warning': { library: 'MaterialCommunity' as IconLibrary, name: 'alert' },
  'info': { library: 'MaterialCommunity' as IconLibrary, name: 'information' },
  
  // LISA specific icons
  'lisa-robot': { library: 'MaterialCommunity' as IconLibrary, name: 'robot' },
  'lisa-brain': { library: 'MaterialCommunity' as IconLibrary, name: 'brain' },
  'lisa-support': { library: 'MaterialCommunity' as IconLibrary, name: 'account-question' },
  
  // Lisec machine icons
  'machine': { library: 'MaterialCommunity' as IconLibrary, name: 'factory' },
  'maintenance': { library: 'MaterialCommunity' as IconLibrary, name: 'cog-refresh' },
  'diagnostics': { library: 'MaterialCommunity' as IconLibrary, name: 'chart-line' },
  'parts': { library: 'MaterialCommunity' as IconLibrary, name: 'package-variant' },
  'manual': { library: 'MaterialCommunity' as IconLibrary, name: 'book-open-variant' },
  'contact': { library: 'MaterialCommunity' as IconLibrary, name: 'phone-plus' },
  'schedule': { library: 'MaterialCommunity' as IconLibrary, name: 'calendar-clock' },
  'lights': { library: 'MaterialCommunity' as IconLibrary, name: 'lightbulb-on' },
  'installation': { library: 'MaterialCommunity' as IconLibrary, name: 'tools' },
  'safety': { library: 'MaterialCommunity' as IconLibrary, name: 'shield-check' },
  'chat-quick': { library: 'MaterialCommunity' as IconLibrary, name: 'lightning-bolt' },
  
  // Actions
  'add': { library: 'MaterialCommunity' as IconLibrary, name: 'plus' },
  'delete': { library: 'MaterialCommunity' as IconLibrary, name: 'delete' },
  'edit': { library: 'MaterialCommunity' as IconLibrary, name: 'pencil' },
  'save': { library: 'MaterialCommunity' as IconLibrary, name: 'content-save' },
  'search': { library: 'MaterialCommunity' as IconLibrary, name: 'magnify' },
  'filter': { library: 'MaterialCommunity' as IconLibrary, name: 'filter' },
  'settings': { library: 'MaterialCommunity' as IconLibrary, name: 'cog' },
  'help': { library: 'MaterialCommunity' as IconLibrary, name: 'help-circle' },
  
  // UI elements
  'chevron-down': { library: 'MaterialCommunity' as IconLibrary, name: 'chevron-down' },
  'chevron-up': { library: 'MaterialCommunity' as IconLibrary, name: 'chevron-up' },
  'chevron-left': { library: 'MaterialCommunity' as IconLibrary, name: 'chevron-left' },
  'chevron-right': { library: 'MaterialCommunity' as IconLibrary, name: 'chevron-right' },
  'eye': { library: 'MaterialCommunity' as IconLibrary, name: 'eye' },
  'eye-off': { library: 'MaterialCommunity' as IconLibrary, name: 'eye-off' },
  
  // Time and date
  'clock': { library: 'MaterialCommunity' as IconLibrary, name: 'clock-outline' },
  'calendar': { library: 'MaterialCommunity' as IconLibrary, name: 'calendar' },
  'timer': { library: 'MaterialCommunity' as IconLibrary, name: 'timer' },
} as const;

type LisaIconName = keyof typeof LISA_ICONS;

interface IconProps {
  name: LisaIconName | string;
  size?: number;
  color?: string;
  library?: IconLibrary;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  library,
  style,
}) => {
  const theme = useTheme();
  const iconColor = color || theme.colors.onSurface;
  
  // Check if it's a predefined LISA icon
  const lisaIcon = LISA_ICONS[name as LisaIconName];
  const iconLibrary = library || lisaIcon?.library || 'MaterialCommunity';
  const iconName = lisaIcon?.name || name;
  
  const IconComponent = (() => {
    switch (iconLibrary) {
      case 'Material':
        return MaterialIcon;
      case 'Feather':
        return FeatherIcon;
      case 'AntDesign':
        return AntDesignIcon;
      case 'MaterialCommunity':
      default:
        return MaterialCommunityIcon;
    }
  })();
  
  return (
    <IconComponent
      name={iconName}
      size={size}
      color={iconColor}
      style={style}
    />
  );
};

// Export predefined LISA icon names for type safety
export type { LisaIconName };
export default Icon;
