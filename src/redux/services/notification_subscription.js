import axiosInstance from '../../utils/axios';

class NotificationSubscription {
  static addNotificationSubscription(params) {
    return axiosInstance.post('/api/notification-subscription', {
      ...params,
    });
  }

}
export default NotificationSubscription;
