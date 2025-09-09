// src/components/chat/SuggestionChip.tsx - Simple suggestion chip component

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface SuggestionChipProps {
  text: string;
  onPress: () => void;
}

export const SuggestionChip: React.FC<SuggestionChipProps> = ({
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    lineHeight: 12,
    flexShrink: 0, // Prevent text shrinking
  },
});
