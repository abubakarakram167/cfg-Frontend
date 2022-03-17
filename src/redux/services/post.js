import axiosInstance from '../../utils/axios';

class UserPost {
  static addUserPost(params) {
    return axiosInstance.post('/api/userPosts', {
      ...params,
    });
  }
  static getUserPosts(count, page) {
    console.log('getUserPosts==>', count, page);
    return axiosInstance.get(`/api/userPosts?_count=${count}&?_pageNo=${page}`);
  }
  static deleteUserPost(id) {
    return axiosInstance.delete('/api/userPosts/' + id);
  }
  static updatePost(id, params) {
    return axiosInstance.put('/api/userPosts/' + id, {...params});
  }
  static getPostById(id) {
    return axiosInstance.get('/api/userPosts/' + id);
  }
  static addLike(id) {
    return axiosInstance.get('/api/userPosts/love/' + id);
  }
}
export default UserPost;
