import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';





const Main = (props)=>{

    const [socket] = useState( () => io( ":8000" ) );

useEffect(()=>{
    console.log("Inside useEffect for Socket.io-client");

    socket.on("connection", data =>{
        console.log(data);
        console.log(socket.id);
    });

    socket.emit("welcome_message", "This is the message!");

    return ()=> socket.disconnected(true);
},[]);


    return(
        <div>
        <h1>socket test</h1>

        </div>
    )
}


export default Main;