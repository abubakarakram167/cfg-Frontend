import axios from 'axios';

class Auth {
    static register (params) {
        return axios.post('/api/auth/register', {
            ...params
        });

    }
    static login (params) {
        return axios.post('/api/auth/login', {
            ...params
        });

    }
}
export default Auth;
