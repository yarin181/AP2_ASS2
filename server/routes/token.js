const express = require('express');
const tokenController = require('../controllers/token');
const tokenRouter = express.Router();


tokenRouter.route.get('/').post(tokenController.processLogIn);

module.exports= {tokenRouter};

