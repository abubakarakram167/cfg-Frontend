import jsCookie from 'js-cookie';
export const isAuthenticUser = () => {
  return jsCookie.get('login') === 'yes';
};
