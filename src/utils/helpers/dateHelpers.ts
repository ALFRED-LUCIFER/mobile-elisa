// src/utils/helpers/dateHelpers.ts - Date utility functions

import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm');
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatChatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return formatTime(dateObj);
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return formatDate(dateObj, 'MMM dd');
  }
};

export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
};

export const isThisWeek = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInDays = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
};
