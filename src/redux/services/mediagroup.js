import axiosInstance from '../../utils/axios';

class MediaGroup {
  static getMediaGroup() {
    return axiosInstance.get('/api/groups/list/ /private');
  }

  static assignToGroup(user_id, group_id) {
    return axiosInstance.post('/api/groups/assign', {user_id, group_id});
  }

  static createGroup(params) {
    return axiosInstance.post('/api/groups', {...params});
  }

  static getUserGroup() {
    return axiosInstance.get('/api/users/group');
  }
  static getSessionsByGroupId(id) {
    return axiosInstance.get('/api/content/getSessionsBygroup/' + id);
  }
  // static getUserPosts(count) {
  //     return axiosInstance.get('/api/userPosts?_count=' + count);
  // }
  // static deleteUserPost(id) {
  //     return axiosInstance.delete('/api/userPosts/' + id);
  // }
  // static updatePost(id, params) {
  //     return axiosInstance.put('/api/userPosts/' + id, { ...params });
  // }
  // static getPostById(id) {
  //     return axiosInstance.get('/api/userPosts/' + id);
  // }
}
export default MediaGroup;
