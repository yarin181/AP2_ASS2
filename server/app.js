const express = require('express')
const app = express();
const {processLogIn,isLoggedIn} = require('./controllers/token')
const {chatRouter} = require('./routes/chats');
const {tokenRouter} = require('./routes/token');
const {usersRouter} = require('./routes/users');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json);

//restriction for the browser
const cors = require('cors');
app.use(cors());

//connect to mongoose
const mongoose = require('mongoose');

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV,'./config');

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,useUnifiedTopology:true
});

//set the server to use the static files in the public folder.
app.use(express.static('public'))

app.use('/api/chat',isLoggedIn,chatRouter);
app.use('/api/token',tokenRouter);
app.use('/api/users',usersRouter);


//local variable 35:00 in hemi's video
app.listen(process.env.PORT)
