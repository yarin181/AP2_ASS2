const service = require('../services/users.js')
const RegisterUser = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!(res.json(await service.addUser(req.body.username,req.body.password,req.body.displayName,req.body.profilePic)))){
      return res.status(409).send("user already exist");
   }
};
const getUserData = async (req,res) =>{
   //call to the addUser method in services using POST
   ;
   if(!(res.json(await service.getUser(req.body.username)))){
      return res.status(401).send("user not found");
   }
};
module.exports = {RegisterUser,getUserData}