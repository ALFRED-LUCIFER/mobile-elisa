import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { Icon } from './Icon';

interface StatusBarProps {
  isOnline: boolean;
  isTyping: boolean;
  messageCount: number;
  lastActive: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isOnline,
  isTyping,
  messageCount,
  lastActive,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusText: {
      fontSize: 12,
      marginLeft: 6,
      color: theme.colors.onSurfaceVariant,
    },
    messageCount: {
      fontSize: 12,
      marginLeft: 4,
      color: theme.colors.onSurfaceVariant,
    },
    typingText: {
      fontSize: 12,
      color: theme.colors.primary,
      fontStyle: 'italic',
    },
  });

  return (
    <Surface style={styles.container} elevation={1}>
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <Icon
            name={isOnline ? 'wifi' : 'wifi-off'}
            size={16}
            color={isOnline ? theme.colors.primary : theme.colors.error}
          />
          <Text style={styles.statusText}>
            {isOnline ? 'Online' : 'Offline'} • Last active {lastActive}
          </Text>
        </View>
        
        <View style={styles.rightSection}>
          {isTyping && (
            <Text style={styles.typingText}>LISA is typing...</Text>
          )}
          {!isTyping && (
            <>
              <Icon
                name="message-text"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={styles.messageCount}>{messageCount}</Text>
            </>
          )}
        </View>
      </View>
    </Surface>
  );
};