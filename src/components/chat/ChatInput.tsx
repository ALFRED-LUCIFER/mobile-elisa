// src/components/chat/ChatInput.tsx - Enhanced chat input component with modern design

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { TextInput, IconButton, useTheme, Surface, Chip, Text } from 'react-native-paper';
import Icon from '../common/Icon';
import { SuggestionChip } from './SuggestionChip';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  messageCount?: number; // Add message count to control suggestions
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
  messageCount = 0, // Default to 0 if not provided
}) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      // Animate send button
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  // Handle suggestion visibility - show only when input is empty AND no messages exist
  const showSuggestions = message.length === 0 && messageCount === 0;

  const quickSuggestions = [
    {
      text: "How can I contact Lisec technical support?",
      icon: "contact"
    },
    {
      text: "How often should I carry out basic maintenance on my Lisec machine?",
      icon: "maintenance"
    },
    {
      text: "What do the light signals on my machine mean?",
      icon: "parts"
    },
    {
      text: "How can I order spare parts for my Lisec machine?",
      icon: "lights"
    },
   
  ];

  return (
    <Surface style={styles.container} elevation={2}>
      {/* Quick suggestions - part of the same surface */}
      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          {quickSuggestions.map((suggestion, index) => (
            <SuggestionChip
              key={index}
              text={suggestion.text}
              onPress={() => {
                // Directly send the suggestion instead of just setting it
                onSendMessage(suggestion.text);
              }}
            />
          ))}
        </View>
      )}

      {/* Separator line when suggestions are visible */}
      {showSuggestions && <View style={styles.separator} />}

      {/* Text input - with better visual design */}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <View style={[
            styles.textInputContainer,
            {
              borderColor: isFocused ? theme.colors.primary : '#D1D5DB',
              borderWidth: 2,
              backgroundColor: '#FFFFFF',
            }
          ]}>
            <TextInput
              mode="flat"
              value={message}
              onChangeText={setMessage}
              placeholder={placeholder}
              placeholderTextColor="#6B7280"
              multiline={true}
              numberOfLines={1}
              maxLength={1000}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={styles.textInput}
              contentStyle={styles.textInputContent}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              cursorColor="#2563EB"
              selectionColor="#2563EB"
              
            />
          </View>
        </View>

        {/* Enhanced send button */}
        {message.trim() && (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <IconButton
              icon={() => <Icon name="chat-send" size={24} />}
              mode="contained"
              size={24}
              disabled={!message.trim() || disabled}
              onPress={handleSend}
              style={[
                styles.sendButton,
                {
                  backgroundColor: message.trim() && !disabled 
                    ? theme.colors.primary 
                    : theme.colors.surfaceDisabled
                }
              ]}
              iconColor={theme.colors.onPrimary}
            />
          </Animated.View>
        )}
      </View>

      {/* Character counter */}
      {message.length > 800 && (
        <View style={styles.counterContainer}>
          <Chip
            mode="outlined"
            compact
            textStyle={[
              styles.counterText,
              { 
                color: message.length > 950 
                  ? theme.colors.error 
                  : theme.colors.onSurfaceVariant 
              }
            ]}
          >
            {message.length}/1000
          </Chip>
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 24,
    margin: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
    paddingBottom: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E9EA',
    marginHorizontal: -4,
    marginBottom: 12,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
    gap: 8,
  },
  suggestionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 4,
  },
  suggestionChip: {
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  textInputContainer: {
    borderRadius: 24,
    paddingHorizontal: 2,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    maxHeight: 160,
    minHeight: 50,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  textInputContent: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 16,
    lineHeight: 22,
    color: '#1F2937',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
  sendButton: {
    marginBottom: 8,
    borderRadius: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  counterContainer: {
    alignItems: 'flex-end',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  counterText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
