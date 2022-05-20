import {getWithExpiry} from '../../shared/expireTime';

export const isAuthenticUser = () => {
  return getWithExpiry('isLogin');
};
