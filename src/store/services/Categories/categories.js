import axios from 'axios';

class Auth {
    static getAll () {
        return axios.get('/api/category/list');
    }
    static login (params) {
        return axios.post('/api/auth/login', {
            ...params
        });

    }
}
export default Auth;
