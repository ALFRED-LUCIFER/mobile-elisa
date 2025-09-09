// src/components/common/QuickActionsFAB.tsx - Floating action button with quick actions

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Portal, useTheme } from 'react-native-paper';
import Icon from './Icon';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface QuickActionsFABProps {
  onNewChat: () => void;
  onClearHistory: () => void;
  onSettings: () => void;
  onVoiceInput?: () => void;
}

export const QuickActionsFAB: React.FC<QuickActionsFABProps> = ({
  onNewChat,
  onClearHistory,
  onSettings,
  onVoiceInput,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const actions = [
    {
      icon: 'add',
      label: 'New Chat',
      onPress: () => {
        onNewChat();
        setOpen(false);
      },
      color: theme.colors.primary,
    },
    {
      icon: 'chat-voice',
      label: 'Voice Input',
      onPress: () => {
        onVoiceInput?.();
        setOpen(false);
      },
      color: theme.colors.secondary,
    },
    {
      icon: 'delete',
      label: 'Clear History',
      onPress: () => {
        onClearHistory();
        setOpen(false);
      },
      color: theme.colors.error,
    },
    {
      icon: 'settings',
      label: 'Settings',
      onPress: () => {
        onSettings();
        setOpen(false);
      },
      color: theme.colors.tertiary,
    },
  ];  return (
    <Portal>
            <FAB.Group
        open={open}
        visible={true}
        icon={open ? 'close' : () => <Icon name="elisa-brain" size={24} />}
        actions={actions.map(action => ({
          ...action,
          icon: () => <Icon name={action.icon} size={20} />,
        }))}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {
            // Do nothing - will close via onStateChange
          } else {
            setOpen(true);
          }
        }}
        fabStyle={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
          }
        ]}
        color={theme.colors.onPrimary}
        rippleColor={theme.colors.primaryContainer}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fab: {
    margin: 16,
    borderRadius: 28,
  },
});
