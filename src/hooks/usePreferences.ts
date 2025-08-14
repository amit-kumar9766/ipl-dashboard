import { useState, useEffect, useCallback } from 'react';
import { storage, getDefaultPreferences, mergePreferences, isValidRefreshInterval } from '../utils';
import { CACHE_KEYS, VALIDATION_RULES } from '../constants/config';

interface UserPreferences {
  autoRefresh: boolean;
  refreshInterval: number;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(getDefaultPreferences());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = storage.get<UserPreferences>(CACHE_KEYS.USER_PREFERENCES);
    
    if (savedPreferences) {
      // Validate and merge with defaults
      const validatedPreferences = {
        ...getDefaultPreferences(),
        ...savedPreferences,
        // Validate refresh interval
        refreshInterval: isValidRefreshInterval(savedPreferences.refreshInterval)
          ? savedPreferences.refreshInterval
          : VALIDATION_RULES.DEFAULT_REFRESH_INTERVAL,
      };
      
      setPreferences(validatedPreferences);
    }
    
    setIsLoaded(true);
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      storage.set(CACHE_KEYS.USER_PREFERENCES, preferences);
    }
  }, [preferences, isLoaded]);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const newPreferences = mergePreferences(prev, updates);
      
      // Validate refresh interval
      if (updates.refreshInterval !== undefined) {
        if (!isValidRefreshInterval(updates.refreshInterval)) {
          newPreferences.refreshInterval = VALIDATION_RULES.DEFAULT_REFRESH_INTERVAL;
        }
      }
      
      return newPreferences;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    const defaultPrefs = getDefaultPreferences();
    setPreferences(defaultPrefs);
    storage.set(CACHE_KEYS.USER_PREFERENCES, defaultPrefs);
  }, []);

  const toggleAutoRefresh = useCallback(() => {
    updatePreferences({ autoRefresh: !preferences.autoRefresh });
  }, [preferences.autoRefresh, updatePreferences]);

  const setRefreshInterval = useCallback((interval: number) => {
    if (isValidRefreshInterval(interval)) {
      updatePreferences({ refreshInterval: interval });
    }
  }, [updatePreferences]);

  const toggleNotifications = useCallback(() => {
    updatePreferences({ notifications: !preferences.notifications });
  }, [preferences.notifications, updatePreferences]);

  const setTheme = useCallback((theme: UserPreferences['theme']) => {
    updatePreferences({ theme });
  }, [updatePreferences]);

  const setLanguage = useCallback((language: string) => {
    updatePreferences({ language });
  }, [updatePreferences]);

  return {
    preferences,
    isLoaded,
    updatePreferences,
    resetPreferences,
    toggleAutoRefresh,
    setRefreshInterval,
    toggleNotifications,
    setTheme,
    setLanguage,
  };
}; 