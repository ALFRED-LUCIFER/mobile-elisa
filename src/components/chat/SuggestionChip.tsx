// src/components/chat/SuggestionChip.tsx - Enhanced suggestion chip component

import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import Icon, { LisaIconName } from '../common/Icon';

interface SuggestionChipProps {
  text: string;
  icon: LisaIconName;
  onPress: () => void;
  index?: number;
}

export const SuggestionChip: React.FC<SuggestionChipProps> = ({
  text,
  icon,
  onPress,
  index = 0,
}) => {
  const theme = useTheme();
  
  // Single consistent color scheme
  const colors = {
    background: '#FEF2F2',
    border: '#DC2626',
    text: '#7F1D1D',
    icon: '#DC2626',
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Surface
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
        elevation={2}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              size={18}
              color={colors.icon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
              ]}
              numberOfLines={2}
            >
              {text}
            </Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 10,
    marginBottom: 10,
    flex: 1,
    minWidth: 140,
    maxWidth: 160,
    minHeight: 60,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
  },
});
