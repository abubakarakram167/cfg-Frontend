import axiosInstance from '../../utils/axios';

class UserPost {
  static addUserPost(params) {
    return axiosInstance.post('/api/userPosts', {
      ...params,
    });
  }
  static getUserPosts(count) {
    return axiosInstance.get('/api/userPosts?_count=' + count);
  }
  static deleteUserPost(id) {
    return axiosInstance.delete('/api/userPosts/' + id);
  }
  static updatePost(id, params) {
    return axiosInstance.put('/api/userPosts/' + id, {...params});
  }
}
export default UserPost;
