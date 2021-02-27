import axiosInstance from "../../../utils/axios";

class Preferences {
  static getPreferences(params) {
    return axiosInstance.get("/api/preferences/list");
  }
  static editPreferences(params, body) {
    return axiosInstance.put(`/api/preferences/edit/${params}`, body);
  }
}
export default Preferences;
