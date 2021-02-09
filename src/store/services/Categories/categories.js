import axiosInstance from '../../../utils/axios';

class Auth {
    static getAll () {
        return axiosInstance.get('/api/category/list');
    }
    static login (params) {
        return axiosInstance.post('/api/auth/login', {
            ...params
        });

    }
}
export default Auth;
