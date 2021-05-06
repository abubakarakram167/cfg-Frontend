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
  static getListData(id, type) {
    return axiosInstance.get(
      `/api/content/list/content/${type}/` + id + '?_count=100&_pageNo=1',
    );
  }
  static getContentData(id) {
    return axiosInstance.get('api/content/' + id);
  }
  static editTitle(params, id) {
    return axiosInstance.put('/api/content/' + id, {
      ...params,
    });
  }
}

export default Session;
