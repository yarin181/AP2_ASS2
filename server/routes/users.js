const {registerUser,getUserData} =  require("../controllers/users.js");
const express = require('express')
const usersRouter = express.Router();

//not necessary need to see how to handle with this
usersRouter.route('/')
    .post(registerUser);

usersRouter.route('/:username')
    .get(getUserData)

module.exports= {usersRouter};
