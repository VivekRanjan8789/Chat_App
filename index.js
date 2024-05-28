const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const { PORT } = require('./src/config/serverConfig');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('msg_send', (data) => {
        console.log(data);
        io.emit('msg_rcvd', data);
    })

});

app.use('/', express.static(__dirname + '/public'));

server.listen(PORT, ()=> {
    console.log('server started at PORT: ',PORT);
});






