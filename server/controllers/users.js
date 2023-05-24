const service = require('../services/users.js')
const RegisterUser = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addUser(req.body.username,req.body.password,req.body.displayName,req.body.profilePic));
};
const getUserData = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addUser(req.body.username));
};
module.exports = {RegisterUser,getUserData}