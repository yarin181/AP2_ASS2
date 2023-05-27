const express = require('express');
const chatController = require('../controllers/chat');
const chatRouter = express.Router();


chatRouter.route.get('/')
    .get(chatController.getUserContactsList)
    .post(chatController.addContact);

chatRouter.route('/:id')
    .get(chatController.getChatWithID)
    .post(chatController.deleteContactByID);

chatRouter.route('/:id/messages')
    .post(chatController.addMessageToChatByID)
    .get(chatController.getMessagesByID);


module.exports= {chatRouter};


