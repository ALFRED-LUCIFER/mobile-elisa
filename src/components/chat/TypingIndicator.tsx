// src/components/chat/TypingIndicator.tsx - Typing indicator for assistant

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Icon from '../common/Icon';

export const TypingIndicator: React.FC = () => {
  const theme = useTheme();
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulse = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation = Animated.parallel([
      createPulse(dot1, 0),
      createPulse(dot2, 150),
      createPulse(dot3, 300),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <Card style={[styles.messageCard, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Card.Content style={styles.messageContent}>
          <View style={styles.avatarContainer}>
            <Icon 
              name="elisa-robot" 
              size={20} 
              color={theme.colors.primary}
            />
          </View>
          
          <View style={styles.typingContainer}>
            <Text style={[styles.typingText, { color: theme.colors.onSurfaceVariant }]}>
              eLISA is typing
            </Text>
            <View style={styles.dotsContainer}>
              <Animated.View style={[
                styles.dot,
                { 
                  backgroundColor: theme.colors.primary,
                  opacity: dot1,
                  transform: [{ scale: dot1 }]
                }
              ]} />
              <Animated.View style={[
                styles.dot,
                { 
                  backgroundColor: theme.colors.primary,
                  opacity: dot2,
                  transform: [{ scale: dot2 }]
                }
              ]} />
              <Animated.View style={[
                styles.dot,
                { 
                  backgroundColor: theme.colors.primary,
                  opacity: dot3,
                  transform: [{ scale: dot3 }]
                }
              ]} />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '85%',
    minWidth: '30%',
    elevation: 2,
    borderTopLeftRadius: 4,
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 8,
  },
  typingContainer: {
    flex: 1,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
