import React from 'react';
import { Card, Button } from '../ui';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

interface NotificationToastProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notifications,
  onRemove
}) => {
  if (notifications.length === 0) return null;

  const getBorderColor = (type: string) => {
    if (type === 'success') return 'border-green-500';
    if (type === 'error') return 'border-red-500';
    if (type === 'warning') return 'border-yellow-500';
    return 'border-blue-500';
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          variant="elevated"
          className={`border-l-4 ${getBorderColor(notification.type)}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-white">
                {notification.title}
              </h4>
              <p className="text-gray-300 text-sm">
                {notification.message}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(notification.id)}
            >
              ×
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationToast; 