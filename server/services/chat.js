const {Chats,Messages } = require('../models/chat.js');
const {getUserDetails} = require('../services/users.js');
const { usersData} = require("../models/users");
//const chat = require("../../src/chat_components/Chat");
//find all the documents that contain username
const findDocuments= async (username)=>{
    return (await Chats.find({ 'users.username': username })
        .populate('users', 'username displayName profilePic')
        .lean());
}



//return all contacts (GET/api/chat)
const getChats = async (username) => {
    //create an empty json array
    const jsonArray = [];
    const chats = await Chats.find(); // Retrieve all chats
    //console.log("in chats 17 - " ,chats)
    //console.log("here are the chats: ", chats)
    if(chats !== null){
        for (const chat of chats) {
            //Iterate over each chatchats.
                // const firstUser = UsersPassName.findOne({ _id: chat.users[0] });
                // const secUser = UsersPassName.findOne({ _id: chat.users[1]});
                const user1 = await usersData.findOne({"_id" : chat.users[0]})
                const user2 = await usersData.findOne({"_id" : chat.users[1]})
                //console.log("27 - ",user1.username, user2.username);
/*
                const foundUser = chat.users.find((user) => user.username === username);*/
                if (user1.username === username || user2.username === username) {
                    const lastMessage = chat.messages.length > 0 ? await Messages.findOne(chat.messages[chat.messages.length - 1]) : null;
                    let otherUser;
                    if (user1.username === username){
                        otherUser = user2;
                    }
                    else {
                        otherUser = user1;
                    }
                    //console.log(lastMessage);
                    const jsonObject = {
                        "id": chat.id,
                        "user" : otherUser,
                        "lastMessage" : lastMessage
                    };
                    //console.log(jsonObject)
                    jsonArray.push(jsonObject);

                }

            }
        }

    //console.log("chats list - ",jsonArray)
    return jsonArray;
    }




//add contact (POST/api/chat)
const addChat = async (username,newContact) => {
    //const json = {};
    //const users=[]
    //add register user
    const user = await usersData.findOne({username: username});
    const newUser = await usersData.findOne({username: newContact});
    if(newUser && user){
        //insert the users to the users array;
        //const users = [user,newUser];
        // users.push(user);
        // users.push(newUser);
        //new chat id
        contactID = await Chats.countDocuments();
        //empty messages array
        //const msgArr=[];
        //console.log("contactId : ",contactID,"user :" ,users,"msg arr-" ,msgArr)
        const newChat = await new Chats({
            "id": contactID,
            "users" : [user,newUser],
            "messages": []
        });
        await newChat.save();
        //console.log("the new chat is -",newChat);
        // console.log("newChat 0", newChat.users);
        //console.log("newChat 1", newChat.users[1]);
        //return json.push({contactID,user,msgArr})
        return {
            "id" : contactID,
            "user" : newUser
        }
    }
    //user not found
    return null;
};



//get contact by id (GET/api/chat/{id})
const getChatByID = async (id) => {
    //create an empty json array
    const json = {};
    return json.push(await Chats.find({ 'id': id }).lean());
};



//delete chat by id (POST/api/chat/{id}
const deleteChat = async (id) => {
    return Chats.deleteOne({id});
};


//add message to the chat that has this id (POST/api/chats/{id}/messages
const addMessage = async (id,content,connectUser) => {
    const chat = await Chats.findOne({ "id" :id });
    if (chat) {
        const sender = await usersData.findOne({"username" :connectUser});
        let chatLength = chat.messages.length;
        let messageID =0;
        if(chatLength === 0){
            messageID = 1;
        }else{
            messageID = (await Messages.findOne(chat.messages[chatLength -1])).id + 1;
        }
        const newMessage = await new Messages({
            "id" : messageID,
            "sender" : sender,
            "content" : content
        })
        await newMessage.save();
        chat.messages.push(newMessage);
        await chat.save();
        return newMessage;
    }
    return null
};

///return all the message between the login user and the id contact (GET/api/chats/{id}/messages
const getMessages = async (id) => {
    const chatArray =[]
    const chat = await Chats.findOne({"id" : id});
    console.log(chat);
    for (const msg of chat.messages) {
        const foundMsg = await Messages.findOne(msg);
        const sender = await usersData.findOne(foundMsg.sender);
        chatArray.push({
            "id": foundMsg.id,
            "created": foundMsg.created,
            "sender": sender,
            "content": foundMsg.content
        });
    }
    return chatArray;
};

module.exports = {getChats,addMessage,addChat,deleteChat,getMessages,getChatByID};

