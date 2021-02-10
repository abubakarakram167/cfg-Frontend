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

    static addUser(user) {
        return axiosInstance.post(`/api/users`, {
            ...user
        });
    }
}

export default Auth;
