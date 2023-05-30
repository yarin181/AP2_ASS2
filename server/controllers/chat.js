const service = require('../services/chat.js')
const {getUsername} = require('../services/token.js');


const getUserContactsList = async (req,res) =>{
   console.log(await service.getChats(req.headers.connectedUser));
   res.json(await service.getChats(req.headers.connectedUser));
};
const addContact = async (req,res) =>{
   const token = req.headers.authorization.split(" ")[1]
   const returnVal  = await service.addChat(req.headers.connectedUser,req.body.username);
   if(!returnVal){
      //user not found
      return res.status(400);
   }
   if(returnVal === 400){
      return res.status(400).send("Thou shalt not talk with thy self");
   }
   return res.status(200).send(returnVal);
};
const getChatWithID = async (req,res) =>{
   const returnVal = await service.getChatByID(req.id);
   //call to the addUser method in services using POST
   if(!returnVal){
      return res.status(401).send("Not found");
   }
   return res.status(200).send(returnVal);
};
const deleteChatByID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.deleteChat(req.id))){
      return res.status(404).send("Not found");
   }
   return res.status(200)
};
const addMessageToChatByID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.addMessage(req.params.id,req.body.msg,req.headers.connectedUser))){
      return res.status(404).send("chat id not found");
   }
};
const getMessagesByID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.getMessages(req.params.id))){
      return res.status(404).send("id not found");
   }
};
module.exports = {getMessagesByID,addMessageToChatByID,deleteChatByID,getChatWithID,addContact,getUserContactsList}