// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
  ENDPOINTS: {
    SCRAPE: '/api/scrape',
  },
  TIMEOUT: 15000,
  CACHE_DURATION: 3 * 60 * 1000, // 3 minutes
} as const;

// Data Sources Configuration
export const DATA_SOURCES = {
  IPL_MAIN: 'https://www.iplt20.com/',
  IPL_MATCHES: 'https://www.iplt20.com/matches',
  IPL_POINTS: 'https://www.iplt20.com/points-table',
  ESPN_CRICKET: 'https://www.espncricinfo.com/series/indian-premier-league-2024-1410320',
  CRIKBUZZ: 'https://www.cricbuzz.com/cricket-series/6732/indian-premier-league-2024',
} as const;

// UI Configuration
export const UI_CONFIG = {
  THEME: {
    COLORS: {
      PRIMARY: '#3B82F6',
      SECONDARY: '#8B5CF6',
      SUCCESS: '#10B981',
      WARNING: '#F59E0B',
      ERROR: '#EF4444',
      INFO: '#06B6D4',
    },
    GRADIENTS: {
      PRIMARY: 'from-blue-600 to-blue-800',
      SECONDARY: 'from-purple-600 to-purple-800',
      SUCCESS: 'from-green-600 to-green-800',
      WARNING: 'from-yellow-600 to-yellow-800',
      ERROR: 'from-red-600 to-red-800',
    },
  },
  ANIMATIONS: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
  },
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE: 1280,
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'IPL Dashboard',
  VERSION: '1.0.0',
  DESCRIPTION: 'Real-time IPL cricket dashboard with live updates and analytics',
  AUTHOR: 'IPL Dashboard Team',
  REPO_URL: 'https://github.com/your-username/ipl-dashboard',
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_REAL_TIME_UPDATES: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_AUTO_REFRESH: true,
  ENABLE_ANALYTICS: true,
  ENABLE_HISTORICAL_DATA: true,
} as const;

// Cache Keys
export const CACHE_KEYS = {
  IPL_DATA: 'ipl_data',
  USER_PREFERENCES: 'user_preferences',
  NOTIFICATIONS: 'notifications',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SCRAPING_FAILED: 'Unable to fetch live data. Showing cached information.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_UPDATED: 'Data updated successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
  NOTIFICATION_SENT: 'Notification sent successfully',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  MIN_REFRESH_INTERVAL: 30000, // 30 seconds
  MAX_REFRESH_INTERVAL: 600000, // 10 minutes
  DEFAULT_REFRESH_INTERVAL: 180000, // 3 minutes
} as const; 