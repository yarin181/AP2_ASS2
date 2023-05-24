const {Chats,Messages,Contacts  } = require('../models/chat.js');
const {getUser} = require('../services/users.js');

//return all contacts
const getChats = async () => {
    return Contacts.find();
};

//update last message
const updateLastMessage = async (contactId, newLastMessage) => {
    const contact = await Contacts.findById(contactId);
    if (!contact) {
        //Contact not found
        return null;
    }
    contact.lastMessage = newLastMessage;
    return await contact.save();
}

//add contact
const addChat = async (username) => {
    //empty messages array
    const msgArr=[];
    const user = getUser(username);
    // ?????? how to get id?
    const newChat = new Chats({id,user,msgArr});
    return await newChat.save();
};

//get contact
const getChat = async (id) => {
    return Chats.findOne({id});
};

//delete a species chat
const deleteChat = async (id) => {
    return Chats.deleteOne({id});
};

const addMessage = async (id,created,sender,content) => {
    const newMessage = new Messages({id,created,sender,content});
    return await newMessage.save();
};

//get new message
const getMessage = async (id) => {
    return Messages.findOne({id});
};

module.exports = { getChats,addMessage,addChat,getChat,deleteChat,getMessage,updateLastMessage};

