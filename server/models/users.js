const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const usersPassNameSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
});

const usersPassSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
});


const usersDataSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
});

const UsersPassName = model('usersPassName', usersPassNameSchema);
const UsersPass = model('usersPass', usersPassSchema);
const Users = model('users', usersSchema);
const usersData = model('usersData', usersDataSchema);

//module.exports = { UsersPassName, UsersPass, Users, usersDate};
module.exports = {usersData};
