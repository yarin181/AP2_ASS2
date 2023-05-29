const service = require('../services/users.js')
const registerUser = async (req,res) =>{
   //call to the addUser method in services using POST
   if(!(res.json(await service.addUser(req.body.username,req.body.password,req.body.displayName,req.body.profilePic)))){
      return res.status(409).send("user already exist");
   }
};
const getUserData = async (req,res) =>{
   //console.log("in get User Data" ,req.params.username)
   const user = await service.getUser(req.params.username);
   //call to the addUser method in services using POST
   if(!user){
      return res.status(401).send("user not found");
   }
   //console.log("the user is" ,user)
   res.status(200).send(user)
};
module.exports = {registerUser,getUserData}