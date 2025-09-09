// src/screens/chat/ChatScreen.tsx - Enhanced Chat Interface with Modern UI

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Appbar,
  useTheme,
  Snackbar,
  Text,
  Avatar,
  IconButton,
  Badge,
  Surface,
  Portal,
  Modal,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState, AppDispatch } from '../../store/store';
import { 
  addMessage,
  initializeChat, 
  setTyping, 
  addBotMessage,
  setError,
  clearMessages,
  setConnectionStatus 
} from '../../store/slices/chatSlice';
import { useSendMessageMutation } from '../../services/api/chatApi';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { ChatInput } from '../../components/chat/ChatInput';
import { TypingIndicator } from '../../components/chat/TypingIndicator';
import { StatusBar as CustomStatusBar } from '../../components/common/StatusBar';
import { Message } from '../../types/chat';

const { width, height } = Dimensions.get('window');

export const ChatScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const flatListRef = useRef<FlatList>(null);
  const [sendMessageAPI, { isLoading: isAPISending }] = useSendMessageMutation();
  
  // Animation values
  const headerOpacity = useRef(new Animated.Value(1)).current;
  
  // Local state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [currentSessionName, setCurrentSessionName] = useState('New Chat');

  const { 
    messages, 
    isLoading, 
    isTyping, 
    error, 
    sessionId, 
    connectionStatus 
  } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    // Initialize chat session
    dispatch(initializeChat());
    
    // Load chat history from storage if available
    loadChatHistory();
  }, [dispatch]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const loadChatHistory = async () => {
    // TODO: Load from AsyncStorage or API
    // For now, mock some history data
    const mockHistory = [
      { id: '1', name: 'Machine Maintenance', lastMessage: 'How to fix hydraulic pump?', timestamp: new Date().toISOString() },
      { id: '2', name: 'Safety Protocols', lastMessage: 'Emergency shutdown procedures', timestamp: new Date().toISOString() },
      { id: '3', name: 'Troubleshooting', lastMessage: 'Motor overheating issues', timestamp: new Date().toISOString() },
    ];
    setChatSessions(mockHistory);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to state
    const userMessage: Message = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: content.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    dispatch(addMessage(userMessage));
    dispatch(setTyping(true));

    try {
      // Call the actual RAG endpoint
      const response = await fetch('https://gpt.lisec.com/api/elise-rag-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          session_id: sessionId || 'default',
          conversation_history: messages.slice(-10), // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response to state
      dispatch(addBotMessage({
        text: data.response || data.message || 'I received your message, but I\'m having trouble generating a response right now.',
        metadata: {
          confidence: data.confidence,
          sources: data.sources,
        },
      }));
      
      dispatch(setConnectionStatus('connected'));

    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Fallback response
      dispatch(addBotMessage({
        text: 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a moment.',
      }));
      
      dispatch(setError('Failed to send message. Please check your connection.'));
      dispatch(setConnectionStatus('disconnected'));
    } finally {
      dispatch(setTyping(false));
    }
  };

  const handleClearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            dispatch(clearMessages());
            dispatch(initializeChat());
          }
        },
      ]
    );
  };

  const handleNewChat = () => {
    dispatch(clearMessages());
    dispatch(initializeChat());
    setCurrentSessionName('New Chat');
    setIsHistoryOpen(false);
  };

  const selectChatSession = (session: any) => {
    setCurrentSessionName(session.name);
    setIsHistoryOpen(false);
    // TODO: Load messages for this session
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => (
    <ChatMessage 
      message={item}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Avatar.Icon 
        size={80} 
        icon="robot" 
        style={[styles.emptyAvatar, { backgroundColor: theme.colors.primary }]}
      />
      <Text variant="headlineSmall" style={styles.emptyTitle}>
        Hello! I'm LISA
      </Text>
      <Text variant="bodyLarge" style={styles.emptySubtitle}>
        Your Learning Intelligence Support Assistant
      </Text>
      <Text variant="bodyMedium" style={styles.emptyDescription}>
        Ask me anything about machine maintenance, troubleshooting, or safety protocols.
      </Text>
    </View>
  );

  const renderHistorySidebar = () => (
    <Portal>
      <Modal
        visible={isHistoryOpen}
        onDismiss={() => setIsHistoryOpen(false)}
        contentContainerStyle={styles.historyModal}
      >
        <Surface style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text variant="headlineSmall" style={styles.historyTitle}>
              Chat History
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setIsHistoryOpen(false)}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.newChatButton}
            onPress={handleNewChat}
          >
            <IconButton icon="plus" size={24} />
            <Text variant="titleMedium">New Chat</Text>
          </TouchableOpacity>

          <FlatList
            data={chatSessions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => selectChatSession(item)}
              >
                <View style={styles.historyItemContent}>
                  <Text variant="titleMedium" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text variant="bodySmall" numberOfLines={2} style={styles.historyLastMessage}>
                    {item.lastMessage}
                  </Text>
                </View>
                <IconButton icon="chevron-right" size={20} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Surface>
      </Modal>
    </Portal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      
      {/* Enhanced Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Appbar.Header 
          elevated 
          style={[styles.appbar, { backgroundColor: theme.colors.primary }]}
        >
          <Appbar.Action 
            icon="menu" 
            iconColor={theme.colors.onPrimary}
            onPress={() => setIsHistoryOpen(true)}
          />
          
          <View style={styles.headerContent}>
            <Avatar.Icon 
              size={36} 
              icon="robot" 
              style={styles.headerAvatar}
            />
            <View style={styles.headerText}>
              <Appbar.Content 
                title="LISA Assistant"
                titleStyle={[styles.headerTitle, { color: theme.colors.onPrimary }]}
              />
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: connectionStatus === 'connected' ? '#4CAF50' : '#F44336' }
                ]} />
                <Text style={[styles.statusText, { color: theme.colors.onPrimary }]}>
                  {connectionStatus === 'connected' ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
          </View>

          <Appbar.Action 
            icon="delete-outline" 
            iconColor={theme.colors.onPrimary}
            onPress={handleClearChat}
          />
        </Appbar.Header>
      </Animated.View>

      {/* Status Bar */}
      <CustomStatusBar 
        isOnline={connectionStatus === 'connected'}
        isTyping={isTyping}
        messageCount={messages.length}
        lastActive="now"
      />

      {/* Messages List */}
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messagesList,
            messages.length === 0 && styles.messagesListEmpty
          ]}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => {
            Animated.timing(headerOpacity, {
              toValue: 0.8,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }}
          onScrollEndDrag={() => {
            Animated.timing(headerOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <TypingIndicator />
          </View>
        )}
      </View>

      {/* Enhanced Chat Input - positioned at bottom */}
      <View style={styles.inputWrapper}>
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading || isAPISending}
          placeholder="Type a message..."
          messageCount={messages.length}
        />
      </View>


      {/* History Sidebar */}
      {renderHistorySidebar()}

      {/* Error Snackbar */}
      <Snackbar
        visible={!!error}
        onDismiss={() => dispatch(setError(null))}
        duration={4000}
        action={{
          label: 'Retry',
          onPress: () => {
            dispatch(setError(null));
            dispatch(setConnectionStatus('connected'));
          },
        }}
      >
        {error}
      </Snackbar>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    zIndex: 1000,
  },
  appbar: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerAvatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    opacity: 0.9,
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 120, // Space for fixed input at bottom
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messagesListEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  emptyAvatar: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
  },
  emptyDescription: {
    textAlign: 'center',
    color: '#888',
    lineHeight: 20,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  inputContainer: {
    margin: 16,
    marginTop: 8,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8F9FA',
    paddingBottom: 20, // Space above navigation bar
    paddingHorizontal: 8,
  },
  historyModal: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 0,
  },
  historyContainer: {
    width: width * 0.85,
    height: height,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  historyTitle: {
    fontWeight: '700',
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  historyItemContent: {
    flex: 1,
  },
  historyLastMessage: {
    color: '#666',
    marginTop: 4,
  },
});
