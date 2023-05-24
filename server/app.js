const express = require('express')
//initial express
var app = express();

//signal for the post
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
//transfer the information throw the json
app.use(express.json);

//restriction for the browser
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
//connect to mongoose
mongoose.connect(process.env.CONNECTION_STRING,{
   useNewUrlParser:true,useUnifiedTopology:true
});
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV,'./config');

app.use(express.static('public'))
//local variable 35:00 in hemi's video
app.listen(process.env.PORT)
