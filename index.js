const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const { PORT } = require('./config/serverConfig');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const connect = require('./config/database-config');

// making connection with user with help of io.on
io.on('connection', (socket) => {
    socket.on('join_room', (data) => {   
        socket.join(data.roomid);
    });

    socket.on('msg_send', (data) => {  // listen and handles events on a specific client's socket
        // console.log(data);
         io.to(data.roomid).emit('msg_rcvd', data);
    });

});

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid', (req, res) => {
    res.render('index', {
         name: 'vivek',
         id: req.params.roomid
    });
})

server.listen(PORT, async ()=> {
    console.log('server started at PORT: ',PORT);
    console.log(connect);
    await connect();
    console.log("mongodb connected");
});






