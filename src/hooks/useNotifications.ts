import { useState, useCallback, useRef } from 'react';
import { generateId } from '../utils';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  autoDismiss?: boolean;
  duration?: number;
}

interface UseNotificationOptions {
  duration?: number;
  autoDismiss?: boolean;
  type?: Notification['type'];
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addNotification = useCallback((
    title: string,
    message: string,
    type: Notification['type'] = 'info',
    options: UseNotificationOptions = {}
  ) => {
    const id = generateId();
    const notification: Notification = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
      autoDismiss: options.autoDismiss ?? true,
      duration: options.duration ?? 5000,
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-dismiss functionality
    if (notification.autoDismiss && notification.duration) {
      const timeoutId = setTimeout(() => {
        removeNotification(id);
      }, notification.duration);

      timeoutRefs.current.set(id, timeoutId);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    // Clear timeout if exists
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    // Clear all timeouts
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current.clear();
    
    setNotifications([]);
  }, []);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  const getNotificationsByType = useCallback((type: Notification['type']) => {
    return notifications.filter(notification => notification.type === type);
  }, [notifications]);

  return {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    getUnreadCount,
    getNotificationsByType,
  };
}; 