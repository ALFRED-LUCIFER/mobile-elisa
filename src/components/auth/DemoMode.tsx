// src/components/auth/DemoMode.tsx - Demo Mode Quick Access

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Divider, Card } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';

export const DemoMode: React.FC = () => {
  const { login, isLoading } = useAuth();

  const handleDemoLogin = async () => {
    // Auto-login with demo credentials
    await login({
      email: 'demo@lisa.com',
      password: 'demo123'
    });
  };

  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      
      <Text variant="labelMedium" style={styles.demoText}>
        Quick Demo Access
      </Text>
      
      <Card style={styles.credentialsCard}>
        <Card.Content style={styles.cardContent}>
          <Text variant="bodySmall" style={styles.credentialsTitle}>
            💡 Test Credentials (Any email/password works!)
          </Text>
          <Text variant="bodySmall" style={styles.credentialsText}>
            Email: demo@lisa.com{'\n'}Password: demo123
          </Text>
        </Card.Content>
      </Card>
      
      <Button
        mode="contained"
        onPress={handleDemoLogin}
        disabled={isLoading}
        loading={isLoading}
        style={styles.demoButton}
        icon="rocket-launch"
      >
        Skip Login - Access eLISA Chat
      </Button>
      
      <Text variant="bodySmall" style={styles.helpText}>
        Direct access to chat features - no real authentication required
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  divider: {
    width: '80%',
    marginBottom: 16,
  },
  demoText: {
    color: '#666666',
    marginBottom: 12,
    fontWeight: '600',
  },
  credentialsCard: {
    marginBottom: 16,
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  credentialsTitle: {
    fontWeight: '600',
    color: '#E65100',
    marginBottom: 4,
  },
  credentialsText: {
    color: '#BF360C',
    fontFamily: 'monospace',
  },
  demoButton: {
    marginBottom: 8,
    backgroundColor: '#FF6B35',
  },
  helpText: {
    color: '#999999',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
});
