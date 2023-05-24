const {Chats,Messages,Contacts  } = require('../models/chat.js');

//return all chats (contacts)
// const getChats = async () => {
//     return Chats.find();
// };

//return all contacts
const getChats = async () => {
    return Contacts.find();
};

//update last message
const updateLastMessage = async (contactId, newLastMessage) => {
    const contact = await Contacts.findById(contactId);
    if (!contact) {
        // Contact not found
        return null;
    }
    contact.lastMessage = newLastMessage;
    return await contact.save();
}

//add chat (contact)
const addChat = async (id,users) => {
    const emptyArr=[];
    const newChat = new Chats({id,users,emptyArr});
    return await newChat.save();
};

//get a species chat
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

module.exports = { getChats,addMessage,addChat,getChat,deleteChat,getMessage};

