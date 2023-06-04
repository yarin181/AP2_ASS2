const connectedUsers = new Map();
// const connectedUsers = []
// const {io} = require("socket.io-client");
const {useState} = require("react");
// const {io} =require("../app")




function assignNewSocket(username,io){
    // console.log("assigning new socket")
    io.on('connection', (socket) => {
        if (!connectedUsers.has(username)){
            connectedUsers.set(username, socket.id);
        }else{
            // console.log("try to add to the sockets a user that already there")
        }
    });
}
function sendWithSocket(recipient,io){
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
        console.log(socket.id)
        // console.log("connected")

       // if(!connectedUsers.has(socket.id)){
       //     connectedUsers.
       // }
        socket.on('join',(data) => {
            if(!connectedUsers.has(socket.id)){
                connectedUsers.set( data , socket.id)
                console.log("user joined: ",data," ",connectedUsers.get(data))
                socket.join(10)
            }
            // if(!connectedUsers.includes(socket.id)){
            //     connectedUsers.push(socket.id)
            //     socket.join(10)
            // }
        });
        socket.on('messageSent',(from,to) => {
            // socket.join(10)
            if(connectedUsers.get(to) !== undefined){
                console.log("send to him: ",connectedUsers.get(to))
                io.to(connectedUsers.get(to)).emit('message',{ num : numOfMessages, sender: from })
            }
            numOfMessages++


        });

        // Remove the user from connectedUsers map when they disconnect
        socket.on('disconnect', () => {

            for (let [key, value] of connectedUsers.entries()) {
                if (value === socket.id) {
                    console.log(key, "disconnected")
                   connectedUsers.delete(key);
                }
            }
            // const index = connectedUsers.indexOf(socket.id);
            // if (index > -1) {
            //     connectedUsers.splice(index, 1);
            // }
            // console.log('A user disconnected');
            // for (let [key, value] of connectedUsers.entries()) {
            //     if (value === socket.id) {
            //         connectedUsers.pop(key);
            //     }
            // }
            //
        });

    });
}

module.exports = {assignNewSocket,socketOnConnection,sendWithSocket};