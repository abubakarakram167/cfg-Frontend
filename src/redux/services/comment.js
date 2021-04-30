import axiosInstance from '../../utils/axiox';

class Comments {
  static addComment(params) {
    return axiosInstance.post('/api/comments', {...params});
  }

  static getPostComments(id) {
    return axiosInstance.get('/api/comments/' + id);
  }

  static deleteComment(id) {
    return axiosInstance.delete('/api/comments/' + id);
  }
}
export default Comments;
