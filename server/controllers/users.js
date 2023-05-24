const service = require('../services/users.js')
const addUser = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addUser(req.body.username,req.body.password,req.body.displayName,req.body.profilePic));
};
const getUser = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addUser(req.body.username));
};
module.exports = {addUser,getUser}