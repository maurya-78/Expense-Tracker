import { useCallback } from 'react';
import { useNotificationStore } from '../store/useNotificationStore';

export const useNotifications = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  const notifySuccess = useCallback((message) => {
    addNotification({ id: Date.now(), type: 'success', message });
  }, [addNotification]);

  const notifyError = useCallback((message) => {
    addNotification({ id: Date.now(), type: 'error', message });
  }, [addNotification]);

  const notifyWarning = useCallback((message) => {
    addNotification({ id: Date.now(), type: 'warning', message });
  }, [addNotification]);

  return { notifySuccess, notifyError, notifyWarning };
};