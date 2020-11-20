import React, {useEffect, useState} from "react";

const useChat = (roomElement, socket, username) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chatMessage", (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === username,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomElement]);

    const sendMessage = (messageBody) => {
        socket.emit("chatMessage", {
            body: messageBody,
            senderId: username,
        });
    };

    return { messages, sendMessage };
}
export default useChat;
