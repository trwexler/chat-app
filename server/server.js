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
        accessControlAllowOrigin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    console.log("nice to meet you (shake hand)");
    
    socket.emit("welcome_message", "Hello");

    socket.emit('new_message', (data)=>{
        console.log('message:' + data);
    } )
    
});


