import messageService from '../services/messages.js';

export const createMessage = (message) => {
  return new Promise((res, rej) => {
    messageService
      .createMessage(message)
      .then((resp) => {
        res(resp);
      })
      .catch((error) => {
        console.log('error from messages', error);
      });
  });
};

export const getFriendMessages = (friendId) => {
  return new Promise((res, rej) => {
    messageService
      .getFriendMessages(friendId)
      .then((resp) => {
        res(resp);
      })
      .catch((error) => {
        console.log('error from messages', error);
      });
  });
};

export const getUserChatFamily = () => {
  return new Promise((res, rej) => {
    messageService
      .getUserChatFamily()
      .then((resp) => {
        res(resp);
      })
      .catch((error) => {
        console.log('error from messages', error);
      });
  });
};
