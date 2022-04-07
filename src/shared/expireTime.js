import jsCookie from 'js-cookie';

export const getTimeInMilliseconds = (time) => {
  const timeSplit = time.split('|');
  const noOfTimes = parseInt(timeSplit[0]);
  const minute_day_week = timeSplit[1];
  var milliseconds = 0;

  if (['week', 'weeks'].includes(minute_day_week)) {
    milliseconds = noOfTimes * 7 * 24 * 60 * 60 * 1000;
  } else if (['days', 'day'].includes(minute_day_week)) {
    milliseconds = noOfTimes * 24 * 60 * 60 * 1000;
  } else if (['minutes', 'minute'].includes(minute_day_week)) {
    milliseconds = 60000 * noOfTimes;
  }

  return milliseconds;
};

export const setWithExpiry = (key, value, ttl, rememberMe) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  if (rememberMe) delete item.expiry;
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem('current-user');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('isLogin');
    jsCookie.remove('login');
    jsCookie.remove('access');

    return null;
  }

  return true;
};
