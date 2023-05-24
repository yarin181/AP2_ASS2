const service = require('../services/chat.js')
const addMessage = async (req,res) =>{
   //call to the addUser method in services using POST
   res.json(await service.addMassage(req.body.id,req.body.created,req.body.sender,req.body.content));
};
module.exports = {addMessage}