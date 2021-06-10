import io from 'socket.io-client';
import {baseUrl} from './utils/axios';

const url = baseUrl;

class Socket {
  constructor(url) {
    this.socket = io.connect(url);
  }
  loginAction(id) {
    this.socket.emit('login', {
      userId: id,
    });
  }
  logoutAction(id) {
    this.socket.emit('logout', {
      userId: id,
    });
  }
  windowAction(id) {
    this.socket.emit('login', {
      userId: id,
    });
  }
  connectAction() {
    this.socket.on('connect', () => {
      console.log(
        'socket has been connected successfully socketId is',
        this.socket.id,
      );
    });
  }
  emitAction(emitType, args) {
    this.socket.emit(emitType, args);
  }
  onAction(onActionType) {
    this.socket.on(onActionType, (value) => value);
  }
  getSocket() {
    return this.socket;
  }
}
export const socket = new Socket(url);
