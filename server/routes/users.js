import usersController from "../controllers/users.js";
const express = require('express')
const router = express.Router();

//not necessary need to see how to handle with this
router.route('/')
    .post(usersController.RegisterUser);

router.route('username')
    .get(usersController.getUserData)

export default router;
