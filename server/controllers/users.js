const service = require('../services/users.js')
const registerUser = async (req,res) =>{
   //call to the addUser method in services using POST
   const status = await service.addUser(req.body.username,req.body.password,req.body.displayName,req.body.profilePic);
   //
   if(status === 409){

      return res.status(409).send("user already exist");
   }
   else{
      return res.status(200).send("Success");
   }
};




const getUserData = async (req,res) =>{
   const user = await service.getUserDetails(req.params.username);
   //call to the addUser method in services using POST
   if(!user){
      return res.status(401).send("invalid token");
   }
   res.status(200).send(user)
};
module.exports = {registerUser,getUserData}