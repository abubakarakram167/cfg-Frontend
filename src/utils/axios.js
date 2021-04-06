import axios from 'axios';
import jsCookie from 'js-cookie';
import history from './history';
import baseURL from './url';
// Set config defaults when creating the instance
console.log('baseURL:', 'https://app.mycfg.org');

let user = JSON.parse(localStorage.getItem('user'));
let options = {
  baseURL: 'https://app.mycfg.org',
  withCredentials: true,
};
if (user && user.token && user.token.token) {
  options.headers = {Authorization: `Bearer ${user.token.token}`};
}

const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('the error', error);
    if (error.response && error.response.status === 401) {
      jsCookie.remove('login');

      // if (
      //     !(~window.location.href.indexOf('login')
      //         || ~window.location.href.indexOf('register')
      //         || ~window.location.href.indexOf('forget')
      //         || ~window.location.href.indexOf('reset'))
      // ) {
      //     history.push("/login");
      // }
    }
    return Promise.reject(error);
  },
);

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common['token'] =
  process.env.REACT_APP_SITE_TOKEN;

export default axiosInstance;
