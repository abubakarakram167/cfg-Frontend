import axiosInstance from '../../utils/axios';

class Session {
  static createSession(params) {
    return axiosInstance.post('/api/content/session', {
      ...params,
    });
  }
}

export default Session;
