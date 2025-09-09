// src/screens/auth/LoginScreen.tsx - Login screen component

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Input } from '../../components/common/Input';
import { Loading } from '../../components/common/Loading';
import { DemoMode } from '../../components/auth/DemoMode';
import { useAuth } from '../../hooks/useAuth';
import { validateLoginForm } from '../../utils/helpers/validationHelpers';
import { AuthStackParamList } from '../../navigation/types';
import { NAVIGATION_ROUTES } from '../../constants/config';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (error) {
      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async () => {
    // Validate form
    const validation = validateLoginForm(formData.email, formData.password);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    // Clear any existing errors
    setFormErrors({});
    clearError();

    // Attempt login
    await login(formData);
  };

  const navigateToRegister = () => {
    navigation.navigate(NAVIGATION_ROUTES.REGISTER);
  };

  const navigateToForgotPassword = () => {
    navigation.navigate(NAVIGATION_ROUTES.FORGOT_PASSWORD);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>
              Welcome to LISA
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Your Learning Intelligence Support Assistant
            </Text>
          </View>

          <Card style={styles.formCard}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.formTitle}>
                Sign In
              </Text>

              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <Input
                label="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                error={formErrors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                required
              />

              <Input
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                error={formErrors.password}
                secureTextEntry
                autoComplete="password"
                required
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                disabled={isLoading}
                loading={isLoading}
                style={styles.loginButton}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Button
                mode="text"
                onPress={navigateToForgotPassword}
                style={styles.forgotButton}
              >
                Forgot Password?
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.footer}>
            <Text variant="bodyMedium" style={styles.footerText}>
              Don't have an account?
            </Text>
            <Button
              mode="text"
              onPress={navigateToRegister}
              style={styles.registerButton}
            >
              Sign Up
            </Button>
          </View>

          {/* Demo Mode for Quick Access */}
          <DemoMode />
        </ScrollView>

        {isLoading && <Loading overlay text="Signing you in..." />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666666',
    textAlign: 'center',
  },
  formCard: {
    marginBottom: 30,
    elevation: 4,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#666666',
    marginBottom: 8,
  },
  registerButton: {
    // No additional styles needed
  },
});
