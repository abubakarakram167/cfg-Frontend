import axiosInstance from '../../utils/axios';

class Session {
  static createSession(params) {
    return axiosInstance.post('/api/content/session', {
      ...params,
    });
  }
  static createTitle(params, type) {
    return axiosInstance.post('/api/content/' + type, {
      ...params,
    });
  }
  static sessionData() {
    return axiosInstance.get('/api/content/list/session?_count=100');
  }
  static getListData(id) {
    return axiosInstance.get('api/content/list/session/' + id);
  }
}

export default Session;
