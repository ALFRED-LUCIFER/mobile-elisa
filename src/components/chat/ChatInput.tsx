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
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Ask LISA anything..."
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

  const quickSuggestions = [
    {
      text: "Contact Technical Support",
      icon: "contact"
    },
    {
      text: "Maintenance Schedule",
      icon: "maintenance"
    },
    {
      text: "Order Spare Parts",
      icon: "parts"
    },
    {
      text: "Machine Diagnostics",
      icon: "lights"
    },
    {
      text: "Installation Guide",
      icon: "installation"
    },
    {
      text: "Safety Procedures",
      icon: "safety"
    },
  ];

  return (
    <Surface style={styles.container} elevation={2}>
      {/* Quick suggestions */}
      {message.length === 0 && !isFocused && (
        <View style={styles.suggestionsContainer}>
            {quickSuggestions.map((suggestion, index) => (
              <SuggestionChip
                key={index}
                text={suggestion.text}
                icon={suggestion.icon as any}
                onPress={() => {
                  // Directly send the suggestion instead of just setting it
                  onSendMessage(suggestion.text);
                }}
                index={index}
              />
            ))}
        </View>
      )}

      <View style={styles.inputRow}>
        {/* Attachment button */}
        <IconButton
          icon={() => <Icon name="chat-attach" size={20} />}
          mode="contained-tonal"
          size={20}
          style={styles.attachButton}
          iconColor={theme.colors.primary}
          onPress={() => {
            // TODO: Implement attachment functionality
          }}
        />

        {/* Text input */}
        <View style={styles.inputWrapper}>
          <TextInput
            mode="outlined"
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            multiline={true}
            numberOfLines={2}
            maxLength={1000}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.textInput,
              {
                backgroundColor: isFocused ? theme.colors.surface : theme.colors.surfaceVariant,
              }
            ]}
            contentStyle={styles.textInputContent}
            outlineStyle={[
              styles.textInputOutline,
              {
                borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
                borderWidth: isFocused ? 2 : 1,
              }
            ]}
            left={
              <TextInput.Icon
                icon={() => <Icon name="chat-message" size={20} />}
                color={theme.colors.onSurfaceVariant}
              />
            }
            right={
              message.trim() ? (
                <TextInput.Icon
                  icon={() => <Icon name="chat-send" size={20} />}
                  disabled={!message.trim() || disabled}
                  onPress={handleSend}
                  color={message.trim() ? theme.colors.primary : theme.colors.onSurfaceVariant}
                  style={{ transform: [{ scale: scaleAnim }] }}
                />
              ) : (
                <TextInput.Icon
                  icon={() => <Icon name="chat-voice" size={20} />}
                  color={theme.colors.onSurfaceVariant}
                  onPress={() => {
                    // TODO: Implement voice input
                  }}
                />
              )
            }
          />
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
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 24,
    margin: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 4,
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
  attachButton: {
    marginBottom: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  inputWrapper: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    maxHeight: 160,
    minHeight: 72,
    backgroundColor: 'transparent',
  },
  textInputContent: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 17,
    lineHeight: 24,
  },
  textInputOutline: {
    borderRadius: 32,
    borderWidth: 2,
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
