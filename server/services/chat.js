const {Chats,Messages } = require('../models/chat.js');
const {getUserDetails} = require('../services/users.js');
const { usersData} = require("../models/users");




//return all contacts (GET/api/chat)
const getChats = async (username) => {
    const jsonArray = [];
    const chats = await Chats.find();

    if (chats !== null) {
        for (const chat of chats) {
            const user1 = await usersData
                .findOne({ "_id": chat.users[0] })
                .populate("username displayName profilePic")
                .lean();
            const user2 = await usersData
                .findOne({ "_id": chat.users[1] })
                .populate("username displayName profilePic")
                .lean();

            if (user1.username === username || user2.username === username) {
                let lastMessage = null;

                if (chat.messages.length > 0) {
                    const message = await Messages.findOne({
                        _id: chat.messages[chat.messages.length - 1]
                    })
                        .populate("id created content")
                        .lean();

                    lastMessage = {
                        id: message.id,
                        created: message.created,
                        content: message.content
                    };
                }

                let otherUser;
                if (user1.username === username) {
                    otherUser = {
                        username: user2.username,
                        displayName: user2.displayName,
                        profilePic: user2.profilePic
                    };
                } else {
                    otherUser = {
                        username: user1.username,
                        displayName: user1.displayName,
                        profilePic: user1.profilePic
                    };
                }

                const jsonObject = {
                    id: chat.id,
                    user: otherUser,
                    lastMessage: lastMessage
                };
                jsonArray.push(jsonObject);
            }
        }
    }
    return jsonArray;
};





//add contact (POST/api/chat)
const addChat = async (username, newContact) => {
    if (username === newContact) {
        return 400;
    }

    const newUser = await usersData.findOne({ username: newContact });
    const user = await usersData.findOne({ username: username });

    if (newUser && user) {
        const maxChatID = await Chats.findOne().sort('-id').limit(1).exec();
        let chatID = 1;

        if (maxChatID) {
            chatID = maxChatID.id + 1;
        }

        const newChat = new Chats({
            "id": chatID,
            "users": [user, newUser],
            "messages": []
        });
        await newChat.save();

        return {
            "id": chatID,
            "user": newUser
        };
    }

    return null;
};


//get contact by id (GET/api/chat/{id})
const getChatByID = async (id) => {
    const chat = await Chats.findOne({ id: id });

    if (chat) {
        const messageArray = [];
        const usersArray = [];

        for (const msg of chat.messages) {
            const newMsg = await Messages.findOne({ _id: msg });
            messageArray.push({
                id: newMsg.id,
                created: newMsg.created,
                sender: newMsg.sender,
                content: newMsg.content
            });
        }

        for (const user of chat.users) {
            const newUser = await usersData.findOne({ _id: user });
            usersArray.push({
                username: newUser.username,
                password: newUser.password,
                displayName: newUser.displayName,
                profilePic: newUser.profilePic
            });
        }

        return {
            id: id,
            users: usersArray,
            messages: messageArray
        };
    }

    return 401;
};



//Delete chat by id (POST/api/chat/{id}
const deleteChat = async (id) => {
    return Chats.deleteOne({id});
};


//add message to the chat that has this id (POST/api/chats/{id}/messages
const addMessage = async (id,content,connectUser) => {

    const chat = await Chats.findOne({ "id" :id });
    if (chat) {
        const sender = await usersData.findOne({"username" :connectUser});
        let chatLength = chat.messages.length;

        const maxMessageID = await Chats.findOne().sort('-id').limit(1).exec();
        let messageID = 1;

        if (maxMessageID) {
            messageID = maxMessageID.id + 1;
        }


        const newMessage = await new Messages({
            "id" : messageID,
            "sender" : sender,
            "content" : content
        })
        await newMessage.save();
        chat.messages.push(newMessage);
        await chat.save();
        return newMessage;
    }
    return null
};

//return all the message between the login user and the id contact (GET/api/chats/{id}/messages
const getMessages = async (id) => {
    const chatArray =[]
    const chat = await Chats.findOne({"id" : id});
    for (const msg of chat.messages) {
        const foundMsg = await Messages.findOne(msg);
        const sender = await usersData.findOne(foundMsg.sender);
        chatArray.push({
            "id": foundMsg.id,
            "created": foundMsg.created,
            "sender": sender,
            "content": foundMsg.content
        });
    }
    return chatArray;

};

module.exports = {getChats,addMessage,addChat,deleteChat,getMessages,getChatByID};

