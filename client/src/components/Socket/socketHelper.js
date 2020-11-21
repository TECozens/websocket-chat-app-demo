import io from 'socket.io-client';
import React from "react";
let socket;

export const initiateSocket = (username ,room) => {
    socket = io('http://localhost:3001');
    console.log(`Connecting socket...`);
    if (socket && room) {
        socket.emit('joinRoom', ({username, room}));
    }
}

export const getRoomUsers  = (cb) => {
    socket.on('roomUsers', ({users}) => {
        return cb(users)
    });
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) {
        socket.disconnect();
    }
}

export const subscribeToChat = (cb) => {
    if (!socket) {
        return true;
    }

    socket.on('message', message => {
        console.log('New Message: ', message);
        const formattedMsg = Object.values(message).join(' , ')
        return cb(null, formattedMsg);
    });
}

export const sendMessage = (room, message) => {
    if (socket) {
        console.log("Sending A new Message: ", message)
        socket.emit('message', message);
    }
}