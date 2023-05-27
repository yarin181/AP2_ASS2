const {Chats,Messages  } = require('../models/chat.js');
const {getUser} = require('../services/users.js');
//const chat = require("../../src/chat_components/Chat");
let contactID=0;
let messageID=0;

//find all the documents that contain username
const findDocuments= async (username)=>{
    return (await Chats.find({ 'users.username': username })
        .populate('users', 'username displayName profilePic')
        .lean());
}


//return all contacts (GET/api/chat)
const getChats = async (username) => {
    //create an empty json array
    const jsonArray = [];

    //Find all documents in chats that contain {username}
    const contacts = await findDocuments(username);
    // Loop through the documents
    Chats.forEach((chat) => {
        const { users } = chat;
        const foundUser = users.find((user) => user.username === username);
        if (foundUser) {
            const otherUser = users.find((user) => user.username !== username);
            if (otherUser) {
                contactID++;
                const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
                jsonArray.push({ id: contactID, user: otherUser, lastMessage}) ;
            }
        }
    });
    return jsonArray;
}



//add contact (POST/api/chat)
const addChat = async (username,newContact) => {
    const json = {};
    const users=[]
    //add register user
    const newUser = getUser(newContact);
    const user = getUser(username);
    if(newUser && user){
        //insert the users to the users array;
        users.push(user);
        users.push(newUser);
        //new chat id
        contactID++;
        //empty messages array
        const msgArr=[];
        const newChat = new Chats(contactID,users,msgArr);
        await newChat.save();
        return json.push({contactID,user,msgArr})
    }
    //user not found
    return null;
};



//get contact by id (GET/api/chat/{id})
const getChatByID = async (id) => {
    //create an empty json array
    const json = {};
    return json.push(await Chats.find({ 'id': id }).lean());
};



//delete chat by id (POST/api/chat/{id}
const deleteChat = async (id) => {
    return Chats.deleteOne({id});
};


//add message to the chat that has this id (POST/api/chats/{id}/messages
const addMessage = async (id,created,sender,content) => {
    messageID++;
    const chat = await Chats.findOne({ id });
    if (chat) {
        chat.messages.push({messageID,created, sender, content});
        await chat.save();
    }
    return null
};

//return all the message between the login user and the id contact (GET/api/chats/{id}/messages
const getMessages = async (id) => {
    const json =[]
    const chat = await Chats.findOne({ id });
    if (chat) {
        chat.forEach((message) => {
            json.push({ id: message.id, created: message.created,sender:message.sender.username, content:message.content}) ;

        });
        return json;
    }
    return null
};

module.exports = {getChats,addMessage,addChat,deleteChat,getMessages,getChatByID};

