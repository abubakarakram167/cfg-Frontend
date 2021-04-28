import io from 'socket.io-client';
const url = 'http://localhost:3690';
export const socket = io(url);
