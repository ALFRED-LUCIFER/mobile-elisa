// src/components/chat/ChatMessage.tsx - Enhanced chat message component

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { 
  Card, 
  Text, 
  useTheme, 
  Chip, 
  Avatar,
  Surface,
  IconButton,
  Menu,
  Divider 
} from 'react-native-paper';
import Icon from '../common/Icon';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  
  const isUser = message.sender === 'user';
  const isAssistant = message.sender === 'assistant';

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'just now';
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return 'clock-outline';
      case 'sent':
        return 'check';
      case 'delivered':
        return 'check-all';
      case 'failed':
        return 'alert-circle-outline';
      default:
        return 'check';
    }
  };

  const getStatusColor = () => {
    switch (message.status) {
      case 'sending':
        return theme.colors.outline;
      case 'sent':
        return theme.colors.outline;
      case 'delivered':
        return theme.colors.primary;
      case 'failed':
        return theme.colors.error;
      default:
        return theme.colors.outline;
    }
  };

  const copyMessage = () => {
    // TODO: Implement clipboard copy
    setMenuVisible(false);
  };

  const regenerateResponse = () => {
    // TODO: Implement regenerate
    setMenuVisible(false);
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={styles.messageRow}>
        {/* Assistant Avatar */}
        {isAssistant && (
          <Avatar.Icon
            size={36}
            icon="robot"
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          />
        )}

        {/* Message Content */}
        <View style={[styles.messageContent, isUser && styles.userMessageContent]}>
          <Surface
            style={[
              styles.messageBubble,
              isUser ? styles.userBubble : styles.assistantBubble,
              { 
                backgroundColor: isUser ? theme.colors.primary : theme.colors.surface,
                elevation: 2,
              }
            ]}
          >
            {/* Message Header for Assistant */}
            {isAssistant && (
              <View style={styles.messageHeader}>
                <Text 
                  variant="labelSmall" 
                  style={[styles.senderName, { color: theme.colors.primary }]}
                >
                  eLISA Assistant
                </Text>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      size={16}
                      onPress={() => setMenuVisible(true)}
                    />
                  }
                >
                  <Menu.Item onPress={copyMessage} title="Copy" leadingIcon="content-copy" />
                  <Menu.Item onPress={regenerateResponse} title="Regenerate" leadingIcon="refresh" />
                  <Divider />
                  <Menu.Item onPress={() => setMenuVisible(false)} title="Cancel" />
                </Menu>
              </View>
            )}

            {/* Message Text */}
            <Text
              variant="bodyMedium"
              style={[
                styles.messageText,
                { color: isUser ? theme.colors.onPrimary : theme.colors.onSurface }
              ]}
            >
              {message.text}
            </Text>

            {/* Metadata for Assistant Messages */}
            {isAssistant && message.metadata && (
              <View style={styles.metadata}>
                {message.metadata.confidence && (
                  <Chip
                    mode="outlined"
                    compact
                    style={styles.metadataChip}
                    textStyle={styles.chipText}
                  >
                    {Math.round(message.metadata.confidence * 100)}% confidence
                  </Chip>
                )}
                {message.metadata.sources && message.metadata.sources.length > 0 && (
                  <Chip
                    mode="outlined"
                    compact
                    style={styles.metadataChip}
                    textStyle={styles.chipText}
                    icon="book-open-variant"
                  >
                    {message.metadata.sources.length} sources
                  </Chip>
                )}
              </View>
            )}

            {/* Message Footer */}
            <View style={styles.messageFooter}>
              <Text 
                variant="labelSmall" 
                style={[
                  styles.timestamp, 
                  { color: isUser ? theme.colors.onPrimary : theme.colors.outline }
                ]}
              >
                {formatTime(message.timestamp)}
              </Text>
              
              {isUser && (
                <Icon
                  name={getStatusIcon()}
                  size={14}
                  color={getStatusColor()}
                />
              )}
            </View>
          </Surface>
        </View>

        {/* User Avatar */}
        {isUser && (
          <Avatar.Icon
            size={36}
            icon="account"
            style={[styles.avatar, styles.userAvatar, { backgroundColor: theme.colors.secondary }]}
          />
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '85%',
  },
  avatar: {
    marginHorizontal: 8,
  },
  userAvatar: {
    marginLeft: 8,
    marginRight: 0,
  },
  messageContent: {
    flex: 1,
  },
  userMessageContent: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    minWidth: 60,
    maxWidth: '100%',
  },
  userBubble: {
    borderBottomRightRadius: 4,
    marginRight: 8,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontWeight: '600',
  },
  messageText: {
    lineHeight: 20,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  metadataChip: {
    height: 24,
  },
  chipText: {
    fontSize: 10,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  timestamp: {
    opacity: 0.7,
  },
});
