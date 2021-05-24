import axiosInstance from '../../utils/axios';

class Timeline {
  static createTimeline(params) {
    return axiosInstance.post('/api/content/timeline', {
      ...params,
    });
  }
  static createTitle(params, type) {
    return axiosInstance.post('/api/content/' + type, {
      ...params,
    });
  }
  static timelineData() {
    return axiosInstance.get('/api/content/list/timeline?_count=1000');
  }
  static getListData(id, type) {
    return axiosInstance.get(
      `/api/content/list/content/${type}/` + id + '?_count=1000&_pageNo=1',
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

export default Timeline;
