import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';





const Main = (props)=>{


    
// const [socket, setSocket] = useState( () => io( ":8000" ) ); Doesn't need setter.
// const [socket] = useState( () => io( ":8000" ) );

// useEffect(()=>{
//     console.log("Inside useEffect for Socket.io-client");

//     socket.on("connection", () =>{
//         console.log("We are connected");
//         console.log(socket.id);
//     });

//     return ()=> socket.disconnected(true);
// },[]);


const [socket] = useState(() => io(':8000'));
 
useEffect(() => {
  // we need to set up all of our event listeners
  // in the useEffect callback function
  console.log('Is this running?');
  socket.on('Welcome', data => console.log(data));

  // note that we're returning a callback function
  // this ensures that the underlying socket will be closed if App is unmounted
  // this would be more critical if we were creating the socket in a subcomponent
  return () => socket.disconnect(true);
}, []);


    return(
        <div>
        <h1>socket test</h1>

        </div>
    )
}


export default Main;