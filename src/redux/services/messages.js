import axios from 'axios';
import axiosInstance from '../../utils/axios';

class Message {
  static createMessage(params) {
    return axiosInstance.post('/api/messages', {
      ...params,
    });
  }
  static getFriendMessages(friendId) {
    return axiosInstance.get(`/api/messages/${friendId}`);
  }
  static getUserChatFamily() {
    return axiosInstance.get('/api/messages/cfgfamily');
  }
}

export default Message;
