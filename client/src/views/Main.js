import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';
import ChatLogin from '../components/ChatLogin';
import ChatWindow from '../components/ChatWindow';





const Main = (props)=>{

    const [userBase, setUserBase] = useState([]);

    const [currentUser, setCurrentUser]=useState({
        userName:"",
        id:""
    });

    useEffect(()=>{
        axios.get('http://localhost:8000/api')
            .then((response)=>{
                console.log(response.data);
                setUserBase(response.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])

    const [socket] = useState( () => io( ":8000" ) );


    return(
        <div>
            <h1>Mern Chat</h1>
          
            <Router>
                <ChatLogin socket={socket} currentUser={currentUser} setCurrentUser={setCurrentUser} default/>
                <ChatWindow currentUser={currentUser} setCurrentUser={setCurrentUser} userBase={userBase} setUserBase={setUserBase} socket={socket} path="/chat/:id"/>
            </Router>
           



        </div>
    )
}


export default Main;