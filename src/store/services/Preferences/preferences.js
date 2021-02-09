import axiosInstance from '../../../utils/axios';

class Preferences {
    static getPreferences (params) {
        return axiosInstance.get('/api/preferences/list');
    }
}
export default Preferences;
