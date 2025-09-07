// src/components/common/Input/Input.tsx - Custom input component

import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

export interface CustomInputProps extends Omit<TextInputProps, 'theme' | 'error'> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerStyle?: any;
}

export const Input: React.FC<CustomInputProps> = ({
  label,
  error,
  helperText,
  required = false,
  containerStyle,
  style,
  ...props
}) => {
  const displayLabel = required ? `${label} *` : label;

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        label={displayLabel}
        error={!!error}
        mode="outlined"
        style={[styles.input, style]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
    marginLeft: 12,
  },
  helperText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    marginLeft: 12,
  },
});
