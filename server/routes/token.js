const express = require('express');
const tokenController = require('../controllers/token');
const router = express.Router();


router.route.get('/').post(tokenController.LogInReturnToken);

export default router;

