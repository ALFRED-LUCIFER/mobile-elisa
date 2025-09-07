// src/components/common/Button/Button.tsx - Custom button component

import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';

export interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  title: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<CustomButtonProps> = ({
  title,
  variant = 'contained',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  onPress,
  ...props
}) => {
  const getButtonStyle = () => {
    const styles = [
      variant === 'contained' && buttonStyles.contained,
      variant === 'outlined' && buttonStyles.outlined,
      variant === 'text' && buttonStyles.text,
      size === 'small' && buttonStyles.small,
      size === 'medium' && buttonStyles.medium,
      size === 'large' && buttonStyles.large,
      fullWidth && buttonStyles.fullWidth,
      style,
    ];
    
    return styles;
  };

  return (
    <PaperButton
      mode={variant === 'text' ? 'text' : variant}
      loading={loading}
      disabled={disabled || loading}
      onPress={onPress}
      style={getButtonStyle()}
      {...props}
    >
      {title}
    </PaperButton>
  );
};

const buttonStyles = StyleSheet.create({
  contained: {
    borderRadius: 8,
  },
  outlined: {
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    borderRadius: 8,
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
});
