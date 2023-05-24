const mongoose = require('mongoose');
const Users = require('../models/users.js');
const { Schema } = mongoose;

const contactSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    lastMessage: {
        type: String,
        // i need to put default value

    }
});
const messageSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
const chatsSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    //an array of users
    users: [{
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    }],
    //an array of messages
    messages: [messageSchema]
});

const Messages = mongoose.model('Message', messageSchema);
const Chats = mongoose.model('chats', chatsSchema);contactSchema
const Contacts = mongoose.model('contacts', contactSchema);


module.exports = { Chats, Messages,Contacts};
