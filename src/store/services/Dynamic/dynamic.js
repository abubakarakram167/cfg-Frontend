import axiosInstance from '../../../utils/axios';

class Dynamic {
    static getAll(type = '', urlString = '') {
        return axiosInstance.get(`/api/content/list/${type}?${urlString}`);
    }

    static addHead(type = '', data) {
        return axiosInstance.post(`/api/content/${type}`, {
            ...data
        });
    }
    static editHead(type = '', data) {
        return axiosInstance.put(`/api/content/${type}`, {
            ...data
        });
    }
}

export default Dynamic;
