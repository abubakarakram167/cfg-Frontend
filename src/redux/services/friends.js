import axiosInstance from '../../utils/axios';

class Friends {
  static sendFriendRequest(params) {
    return axiosInstance.post('/api/friends', {
      ...params,
    });
  }
  static getFriendRequests() {
    return axiosInstance.get('/api/friends/friend-requests');
  }
  static getUserDetails(id) {
    return axiosInstance.get('/api/users/' + id);
  }
  static getSentFriendRequests() {
    return axiosInstance.get('/api/friends/sent-requests');
  }
  static getFriends() {
    return axiosInstance.get('/api/friends');
  }
  static approveFriendRequest(params) {
    return axiosInstance.post('api/friends/approve', {...params});
  }
  static deleteFriendRequest(params) {
    return axiosInstance.post('/api/friends/delete', {...params});
  }
}
export default Friends;
