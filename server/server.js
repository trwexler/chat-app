const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// require('./config/mongoose.config');
// require('./routes/chat.routes')(app);

 

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

 


// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        accessControlAllowOrigin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});
//need to start listening for someone to try to connect to socket
// on this server

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    console.log("nice to meet you (shake hand)");
    
    socket.on("welcome_message", (data) => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        console.log("welcome_message");
        console.log(data);
        socket.emit("message", data);
    });
});
