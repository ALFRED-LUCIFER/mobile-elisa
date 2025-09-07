// src/utils/helpers/validationHelpers.ts - Validation utility functions

import { VALIDATION_RULES } from '../../constants/config';

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.test(email.trim().toLowerCase());
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= VALIDATION_RULES.NAME_MIN_LENGTH && /^[a-zA-Z\s]+$/.test(trimmed);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMessageLength = (message: string): boolean => {
  return message.trim().length <= VALIDATION_RULES.MESSAGE_MAX_LENGTH;
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (!validateRequired(email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (!validateRequired(name)) {
    errors.name = 'Name is required';
  } else if (!validateName(name)) {
    errors.name = 'Please enter a valid name (letters and spaces only)';
  }
  
  if (!validateRequired(email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }
  }
  
  if (!validateRequired(confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
