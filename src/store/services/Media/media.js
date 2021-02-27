import axiosInstance from "../../../utils/axios";

class Media {
  static getMedia(body) {
    return axiosInstance.get("/api/media/list");
  }
  static addMedia(body) {
    return axiosInstance.post("/api/media", body);
  }
}
export default Media;
