// const connectedUsers = new Map();
const connectedUsers = []
// const {io} = require("socket.io-client");
const {useState} = require("react");
// const {io} =require("../app")




function assignNewSocket(username,io){
    // console.log("assigning new socket")
    io.on('connection', (socket) => {
        if (!connectedUsers.has(username)){
            console.log("this is the username ",username)
            connectedUsers.set(username, socket.id);
        }else{
            // console.log("try to add to the sockets a user that already there")
        }
    });
}
function sendWithSocket(recipient,io){
    console.log("send in socket to: ", recipient)
    console.log("connected to chat: ")
    for (let [key, value] of connectedUsers) {
        console.log(`Key: ${key}, Value: ${value}`);
    }
    const recipientSocketId = connectedUsers.get(recipient);
    if (recipientSocketId) {

        io.on('connection', socket => {
            socket.on('messageSent',() => {

                console.log("sending to this guy: ",recipientSocketId)
                socket.to(10).emit('message')
                // for (let [key, value] of connectedUsers) {
                //     socket.to(value).emit('message',{ foo : 'bar' })
                //     // value.emit('message',{ foo : 'bar' })
                // }

                // socket.broadcast.emit('message')
                // socket.to(recipientSocketId).emit('message',{ foo : 'bar' });
                // io.to(recipientSocketId).emit('message',{ foo : 'bar' });
            });
        });
        io.to(recipientSocketId).emit('message',{ foo : 'bar' });
        // io.emit('message',{ foo : 'baba' })
    }
}

function socketOnConnection (io){
    let numOfMessages=1
    // const [numOfMessages,setNumOfMessages]=useState(1)
    io.on('connection', (socket) => {
        // console.log("connected")

       // if(!connectedUsers.has(socket.id)){
       //     connectedUsers.
       // }
        socket.on('join',() => {
            if(!connectedUsers.includes(socket.id)){
                connectedUsers.push(socket.id)
                socket.join(10)
            }
        });
        socket.on('messageSent',() => {
            // socket.join(10)
            for (let i = 0; i <connectedUsers.length; i++) {
                // console.log("send to this: ",connectedUsers[i])
               io.to(connectedUsers[i]).emit('message',{ num : numOfMessages })
               // socket.to(connectedUsers[i]).emit('message',{ num : numOfMessages })
            }
            // socket.broadcast.emit('message',{ num : 'numOfMessages' })
            // io.to(10).emit('message',{ num : numOfMessages })
           numOfMessages++
        });

        // Remove the user from connectedUsers map when they disconnect
        socket.on('disconnect', () => {

            const index = connectedUsers.indexOf(socket.id);
            if (index > -1) {
                connectedUsers.splice(index, 1);
            }
            // console.log('A user disconnected');
            // let eraseUser
            // for (let [key, value] of connectedUsers.entries()) {
            //     if (value === socket.id) {
            //         eraseUser = key;
            //     }
            // }
            // connectedUsers.pop(eraseUser);
        });

    });
}

module.exports = {assignNewSocket,socketOnConnection,sendWithSocket};