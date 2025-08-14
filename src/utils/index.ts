import { Match, PointsTableEntry, Notification, UserPreferences } from '../types';
import { VALIDATION_RULES } from '../constants/config';

// Date and Time Utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

// String Utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? `${str.slice(0, length)}...` : str;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validation Utilities
export const isValidRefreshInterval = (interval: number): boolean => {
  return interval >= VALIDATION_RULES.MIN_REFRESH_INTERVAL && 
         interval <= VALIDATION_RULES.MAX_REFRESH_INTERVAL;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Data Manipulation Utilities
export const sortPointsTable = (
  pointsTable: PointsTableEntry[],
  sortField: keyof PointsTableEntry = 'position',
  sortDirection: 'asc' | 'desc' = 'asc'
): PointsTableEntry[] => {
  return [...pointsTable].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
};

export const filterMatches = (
  matches: Match[],
  filter: 'all' | 'upcoming' | 'live' | 'completed'
): Match[] => {
  if (filter === 'all') return matches;
  return matches.filter(match => match.status === filter);
};

export const searchMatches = (
  matches: Match[],
  searchTerm: string
): Match[] => {
  if (!searchTerm.trim()) return matches;
  
  const term = searchTerm.toLowerCase();
  return matches.filter(match =>
    match.team1.name.toLowerCase().includes(term) ||
    match.team2.name.toLowerCase().includes(term) ||
    match.venue.toLowerCase().includes(term) ||
    match.result?.toLowerCase().includes(term)
  );
};

// Color and Theme Utilities
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'live':
      return 'text-red-400';
    case 'completed':
      return 'text-green-400';
    case 'upcoming':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

export const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'live':
      return 'bg-red-500/20 border-red-500/30';
    case 'completed':
      return 'bg-green-500/20 border-green-500/30';
    case 'upcoming':
      return 'bg-blue-500/20 border-blue-500/30';
    default:
      return 'bg-gray-500/20 border-gray-500/30';
  }
};

export const getTeamColor = (teamName: string): string => {
  const teamColors: Record<string, string> = {
    'Mumbai Indians': 'text-blue-400',
    'Chennai Super Kings': 'text-yellow-400',
    'Royal Challengers Bangalore': 'text-red-400',
    'Kolkata Knight Riders': 'text-purple-400',
    'Delhi Capitals': 'text-blue-500',
    'Punjab Kings': 'text-red-500',
    'Rajasthan Royals': 'text-pink-400',
    'Sunrisers Hyderabad': 'text-orange-400',
    'Gujarat Titans': 'text-blue-600',
    'Lucknow Super Giants': 'text-green-400',
  };
  
  return teamColors[teamName] || 'text-gray-400';
};

// Performance Utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Storage Utilities
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

// Error Handling Utilities
export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('Network') || 
           error.message.includes('fetch') ||
           error.message.includes('timeout');
  }
  return false;
};

// Notification Utilities
export const createNotification = (
  title: string,
  message: string,
  type: Notification['type'] = 'info',
  options: Partial<Notification> = {}
): Omit<Notification, 'id' | 'timestamp' | 'read'> => {
  return {
    title,
    message,
    type,
    autoDismiss: true,
    duration: 5000,
    ...options,
  };
};

// Preferences Utilities
export const getDefaultPreferences = (): UserPreferences => ({
  autoRefresh: true,
  refreshInterval: VALIDATION_RULES.DEFAULT_REFRESH_INTERVAL,
  notifications: true,
  theme: 'dark',
  language: 'en',
});

export const mergePreferences = (
  current: UserPreferences,
  updates: Partial<UserPreferences>
): UserPreferences => {
  return { ...current, ...updates };
};

// Chart Data Utilities
export const prepareChartData = (
  data: any[],
  xField: string,
  yField: string
): Array<{ name: string; value: number }> => {
  return data.map(item => ({
    name: item[xField],
    value: item[yField],
  }));
};

export const getChartColors = (count: number): string[] => {
  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
  ];
  
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Export all utilities
export default {
  formatDate,
  formatTime,
  formatRelativeTime,
  capitalize,
  truncate,
  generateId,
  isValidRefreshInterval,
  validateEmail,
  validateUrl,
  sortPointsTable,
  filterMatches,
  searchMatches,
  getStatusColor,
  getStatusBgColor,
  getTeamColor,
  debounce,
  throttle,
  storage,
  handleError,
  isNetworkError,
  createNotification,
  getDefaultPreferences,
  mergePreferences,
  prepareChartData,
  getChartColors,
}; 