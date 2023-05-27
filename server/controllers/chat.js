const service = require('../services/chat.js')


const getUserContactsList = async (req,res) =>{
   res.json(await service.getChats(req.username));
};
const addContact = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addChat(req.getUsername,req.body.username));
};
const getChatWithID = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.getChatByID(req.id));
};
const deleteContactByID = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.deleteChat(req.id));
};
const addMessageToChatByID = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addMessage(req.id,req.body.created,req.body.sender,req.body.content));
};
const getMessagesByID = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.getMessages(req.id));
};
module.exports = {getMessagesByID,addMessageToChatByID,deleteContactByID,getChatWithID,addContact,getUserContactsList}