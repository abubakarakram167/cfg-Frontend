import axiosInstance from '../../../utils/axios';

class Auth {
    static getAll(urlString) {
        return axiosInstance.get(`/api/users/list?${urlString}`);
    }

    static changeUsersType(type, users) {
        return axiosInstance.put(`/api/users/status/${type}`, {
            users
        });
    }

    static addUser(type, users) {
        return axiosInstance.put(`/api/users/status/${type}`, {
            users
        });
    }
}

export default Auth;
