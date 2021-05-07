import axiosInstance from '../../utils/axios';

class Media {
  static addMedia(formData) {
    return axiosInstance.post('/api/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default Media;
