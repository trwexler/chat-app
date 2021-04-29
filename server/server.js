const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


require('./config/mongoose.config');
require('./routes/chat.routes')(app);

 

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});




const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});



io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    console.log("nice to meet you (shake hand)");
    
    socket.emit("welcome_message", "Hello");

    socket.on('new_message', (data)=>{
        console.log(data);
        console.log(socket.id);
        data.socket_id = socket.id;     //data.socket_id is a key we are adding to the data obj being passed in.
        io.emit('new_message_sent', data);

    //client to server can only speak to each other. no communication between like queries.
   
    });    

    socket.on("new_login", (data)=>{
        console.log("new_login");
        console.log("server-line: 54", data);


        socket.broadcast.emit('new_login_shown', data);
    });

});


