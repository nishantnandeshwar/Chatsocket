const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.static("/public"))
// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

server.listen(9000, () => {
  console.log('Server started and listening on *:9000');
});