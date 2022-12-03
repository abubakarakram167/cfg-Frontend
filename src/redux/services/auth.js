import axiosInstance from '../../utils/axios';

class Auth {
  static register(params) {
    return axiosInstance.post('/api/auth/register', {
      ...params,
    });
  }

  static login(params) {
    return axiosInstance.post('/api/auth/login', {
      ...params,
    });
  }

  static socialLogin(params) {
    return axiosInstance.post('/api/auth/connect/social', {
      ...params,
    });
  }

  static forgot(params) {
    return axiosInstance.post('/api/auth/forgot-password', {
      ...params,
    });
  }

  static reset(params) {
    return axiosInstance.post('/api/auth/reset-password', {
      ...params,
    });
  }

  static getPreferences(params) {
    return axiosInstance.get('/api/preferences/list');
  }

  static updateUser(params) {
    return axiosInstance.put('/api/users', {...params});
  }

  static verifyEmail(token) {
    return axiosInstance.post('/api/auth/verify', {
      token,
    });
  }
}
export default Auth;
