const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path')

const { Server } = require("socket.io");
const io = new Server(server);
const socketIdMap = {};

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    const browserId = generateBrowserId();
    socketIdMap[browserId] = socket.id;

    // Emit the browser identifier to the connected client
    socket.emit('browserId', browserId);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // Remove the browser ID from the map upon disconnection
        delete socketIdMap[browserId];
    });

    socket.on('chat message', (msg) => { // recieved the message from fron-end 
        io.emit('chat message', { msg, socketIdMap }); // pass that message to all on front-end
    });


function generateBrowserId() {
    // You can implement your own logic to generate a unique browser ID here
    return Math.random().toString(36).substr(2, 9);
}


app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
});

server.listen(9000, () => {
    console.log('Server started and listening on *:9000');
});