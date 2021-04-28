import io from 'socket.io-client';
const url = 'http://localhost:3690';

class Socket {
  constructor(url) {
    this.socket = io.connect(url);
  }
  connectAction() {
    this.socket.on('connect', () => {
      console.log('socket has been connected successfully');
    });
  }
  emitAction(emitType, args) {
    this.socket.emit(emitType, args);
  }
  onAction(onActionType, value) {
    console.log(value);
  }
}

export const socket = io.connect(url);
