import io from 'socket.io-client';
const url = 'https://devapp.mycfg.org';

class Socket {
  constructor(url) {
    this.socket = io.connect(url);
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
}

export const socket = new Socket(url);
