import axiosInstance from '../../utils/axios';

class Reply {
  static deleteReply(params) {
    return axiosInstance.post('/api/comments', {...params});
  }
}
export default Reply;
