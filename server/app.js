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
const sockets = require('./controllers/sockets')


const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.set("io", io);

app.use(cors());
//temp
const { UsersPassName, UsersPass, Users } = require('./models/users.js');
//temp

//connect to mongoose
const mongoose = require('mongoose');

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV,'./config');
//console.log(process.env.CONNECTION_STRING)


// mongoose.connect("mongodb://localhost:27017",{
//     useNewUrlParser:true,useUnifiedTopology:true
// });

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// const corsOptions = {
//     origin: 'http://localhost:3001'
// };
//
// app.use(cors(corsOptions));
// app.use(cors());
app.use('/api/Chats',chatRouter);
app.use('/api/Users',usersRouter);
app.use('/api/Tokens',tokenRouter);

// io.on('connection', (socket) => {
//
//     console.log("socket")
//     io.emit('Hello', { foo: 'bar' });
//     socket.broadcast.emit('hi');
//     socket.on('disconnect', () => {
//         console.log('disconnected');
//     });
//     socket.on('foo', (msg) => {
//         console.log('message: ' + msg);
//     });
// });

// io.on('connection', (socket) => {
//     io.emit('Hello', { foo : 'bar' });
//     socket.emit('Hello', { foo : 'bar' })
//
//
// });
// io.on('connection', socket => {
//
//     socket.on('messageSent',() => {
//         socket.join(10)
//         console.log("sending")
//         io.to(10).emit('message')
//         socket.to(10).emit('message',{ foo : 'bar' })
//         // for (let [key, value] of connectedUsers) {
//         //     socket.to(value).emit('message',{ foo : 'bar' })
//         //     // value.emit('message',{ foo : 'bar' })
//         // }
//
//         // socket.broadcast.emit('message')
//         // socket.to(recipientSocketId).emit('message',{ foo : 'bar' });
//         // io.to(recipientSocketId).emit('message',{ foo : 'bar' });
//     });
// });
sockets.socketOnConnection(io)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
});

