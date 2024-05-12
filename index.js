const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path')

const { Server } = require("socket.io");
const io = new Server(server);

const users ={}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete socket.id;
    });

    socket.on('new-user-joined', name =>{
        users[socket.id]= name
        socket.broadcast.emit('user-joined', name)
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

});


app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
});

server.listen(9000, () => {
    console.log('Server started and listening on *:9000');
});