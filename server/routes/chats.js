const express = require('express');
const chatController = require('../controllers/chat');
const router = express.Router();


router.route.get('/')
    .get(chatController.getUserContactsList)
    .post(chatController.addContact);

router.route('/:id')
    .get(chatController.getChatWithID)
    .post(chatController.deleteContactByID);

router.route('/:id/messages')
    .post(chatController.addMessageToChatByID)
    .get(chatController.getMessagesByID);


export default router;


