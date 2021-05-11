import axios from 'axios';
import axiosInstance from '../../utils/axios';

class Session {
  static createTool(params) {
    return axiosInstance.post('/api/content/tool', {
      ...params,
    });
  }
  static createTitle(params, type) {
    return axiosInstance.post('/api/content/' + type, {
      ...params,
    });
  }
  static toolData() {
    return axiosInstance.get('/api/content/list/tool?_count=100');
  }
  static getListData(id) {
    return axiosInstance.get('api/content/list/content/tool/' + id);
  }
  static getContentData(id) {
    return axiosInstance.get('api/content/' + id);
  }
  static editTitle(params, id) {
    return axiosInstance.put('/api/content/' + id, {
      ...params,
    });
  }
  static getAllTools() {
    return axiosInstance.get(
      '/api/content/getAllTitles/tool?_count=100&_pageNo=1',
    );
  }
}

export default Session;
