import axios from 'axios';
import jsCookie from 'js-cookie';
import history from './history';
import baseURL from './url';
import Toastify from 'toastify-js';
// Set config defaults when creating the instance
console.log('baseURL:', baseURL);
export const baseUrl = baseURL;
let user = JSON.parse(localStorage.getItem('user'));
let options = {
  baseURL,
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
    if (error.response && error.response.status === 401) {
      // console.log();
      // console.log("log from axios",~window.location.href.indexOf('/'))
      // console.log("location from axios",~window.location)
      jsCookie.remove('login');
      if (
        error.response.data.message !==
        'Your login details could not be verified. Please try again.'
      ) {
        history.push('/sessionexpired');
      }
    } else {
      if (error.response && error.response.status >= 400) {
        //         Toastify({
        //           text: `Something Went wrong \n "${
        //             error.response && error.response.data && error.response.data.message
        //               ? error.response.data.message
        //               : null
        //           } "`,
        //           duration: 3000,
        //           newWindow: true,
        //           close: true,
        //           gravity: 'bottom', // `top` or `bottom`
        //           position: 'right', // `left`, `center` or `right`
        //           stopOnFocus: true, // Prevents dismissing of toast on hover
        //           style: {
        //             background: 'linear-gradient(to right, #EE4742, #EB1B29)',
        //           }, // Callback after click
        //         }).showToast();
      }
    }
    return Promise.reject(error);
    // return error
  },
);

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common['token'] =
  process.env.REACT_APP_SITE_TOKEN;

export default axiosInstance;
