const service = require('../services/chat.js')
const {getUsername} = require('../services/token.js');


const getUserContactsList = async (req,res) =>{
   res.json(await service.getChats(req.headers.connectedUser));


   // //grt the token
   // const token = req.headers.authorization.split(" ")[1]
   // //call to the addUser method in services using POST
   // if(token){
   //    //console.log(req.headers.connectedUser);
   //
   // }
   // else{
   //    return res.status(401).send("Invalid Token");
   // }
};
const addContact = async (req,res) =>{
   //console.log("in add contact");
   const token = req.headers.authorization.split(" ")[1]
   //call to the addUser method in services using POST
   //console.log("21 connect user is - ",req.headers.connectedUser);
   //console.log("to add user user is - ",req.body.username);
   if(token){
     if (res.json(await service.addChat(req.headers.connectedUser,req.body.username))){
        //console.log("the caht added!")
        //return res.status(400).send("No such user");
     }
   }
   else{
      //console.log("the caht NOT add!");
      return res.status(401).send("Invalid Token");
   }

};
const getChatWithID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.getChatByID(req.id))){
      return res.status(401).send("id not found");
   }
};
const deleteContactByID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.deleteChat(req.id))){
      return res.status(404).send("id not found");
   }
};
const addMessageToChatByID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.addMessage(req.params.id,req.body.msg,req.headers.connectedUser))){
      return res.status(401).send("chat id not found");
   }
};
const getMessagesByID = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!res.json(await service.deleteChat(req.id))){
      return res.status(401).send("id not found");
   }
};
module.exports = {getMessagesByID,addMessageToChatByID,deleteContactByID,getChatWithID,addContact,getUserContactsList}