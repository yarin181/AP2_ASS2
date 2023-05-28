// const express = require('express')
// const app = express();
// const {processLogIn,isLoggedIn} = require('./controllers/token')
// const {chatRouter} = require('./routes/chats');
// const {tokenRouter} = require('./routes/token');
// const {usersRouter} = require('./routes/users');
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.json);
//
// //restriction for the browser
// const cors = require('cors');
// app.use(cors());
//
// //connect to mongoose
// const mongoose = require('mongoose');
//
// const customEnv = require('custom-env');
// customEnv.env(process.env.NODE_ENV,'./config');
//
// mongoose.connect(process.env.CONNECTION_STRING,{
//     useNewUrlParser:true,useUnifiedTopology:true
// });
//
// //set the server to use the static files in the public folder.
// app.use(express.static('public'))
//
// app.post('/',(req,res) =>{
//     res.json("hello user");
// })
// // app.use('/api/chat',isLoggedIn,chatRouter);
// // app.use('/api/token',tokenRouter);
// // app.use('/api/users',usersRouter);
//
//
// //local variable 35:00 in hemi's video
// app.listen(process.env.PORT)

//
// const express = require('express')
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.json);
//
// //restriction for the browser
// const cors = require('cors');
// app.use(cors());
//
// //set the server to use the static files in the public folder.
// app.use(express.static('public'))
//
// app.post('/',(req,res) =>{
//     res.json("hello user");
// })
//
// app.listen(5000)
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
const cors = require('cors');
const {isLoggedIn} = require("./controllers/token");
const {chatRouter} = require("./routes/chats");
const {validUserPassword} = require("./services/users");
const {tokenRouter} = require("./routes/token");
const {usersRouter} = require("./routes/users");

//temp
const { UsersPassName, UsersPass, Users } = require('./models/users.js');
//temp

//connect to mongoose
const mongoose = require('mongoose');

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV,'./config');

mongoose.connect("mongodb://localhost:27017",{
    useNewUrlParser:true,useUnifiedTopology:true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors());
app.use('/api/Chat',chatRouter);
app.use('/api/Users',usersRouter);
app.use('/api/Token',tokenRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
