import usersController from "../controllers/users.js";
const express = require('express')
const usersRouter = express.Router();

//not necessary need to see how to handle with this
usersRouter.route('/')
    .post(usersController.RegisterUser);

usersRouter.route('/:username')
    .get(usersController.getUserData)

module.exports= {usersRouter};
