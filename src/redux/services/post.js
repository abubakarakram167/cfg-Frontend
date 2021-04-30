import axiosInstance from '../../utils/axios';

class UserPost {
  static addUserPost(params) {
    return axiosInstance.post('/api/userPosts', {
      ...params,
    });
  }
  static getUserPosts() {
    return axiosInstance.get('/api/userPosts');
  }
  static deleteUserPost(id) {
    return axiosInstance.delete('/api/userPosts/' + id);
  }
}
export default UserPost;
