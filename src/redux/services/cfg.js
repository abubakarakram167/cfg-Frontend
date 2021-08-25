import axiosInstance from '../../utils/axios';

class Cfg {
  static createResource(params, cfgType) {
    return axiosInstance.post(`/api/content/${cfgType}`, {
      ...params,
    });
  }
  static createTitle(params, type) {
    return axiosInstance.post('/api/content/' + type, {
      ...params,
    });
  }
  static resourceData(cfgType) {
    const url = ('/api/content/list/' + cfgType + '?_count=1000')
      .split('%20')
      .join('');
    return axiosInstance.get(url);
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

export default Cfg;
