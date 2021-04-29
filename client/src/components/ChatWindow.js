import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';





const ChatWindow = (props)=>{

    const {currentUser, setCurrentUser, userBase, setUserBase, socket} = props;
    

    // const [allMessages, setAllMessages]= useState([])

    const[messages, setMessages] = useState([""]);



    const inputHandler = (e)=>{

        setMessages(e.target.value);

        console.log(messages);
    }


    //     console.log("Inside useEffect for Socket.io-client");


    useEffect(()=>{
        socket.on("new_login_shown", (data)=>{
            document.getElementById('loginPopup').classList.add("animate-cssAnimation");
           document.getElementById('loginPopup').innerHTML = data + " has entered the chat!";
        });
    },[]);

    useEffect(()=>{

        socket.on("new_message_sent", (data) =>{

            console.log("new_message_sent");
            console.log(data);
            console.log(socket.id);

            let newMsg = document.createElement("p");

            if(socket.id === data.socket_id){
                newMsg.classList.add("sentMessage");
            }
            else{
                newMsg.classList.add("receivedMessage");
            }

            newMsg.innerHTML = data.userName + " says: " + data.message;
        
            document.getElementById('messageHolder').appendChild(newMsg);

        }) 

    }, []);


    const handleSubmit = (e)=>{

        e.preventDefault();

        let chatInput = document.getElementById('chatInput').value;

        socket.emit('new_message', {
            userName:currentUser.userName,
            message:chatInput
        });

        document.getElementById('chatInput').value = '';
        
    }

    //.on listening .emit is sending client-to-server server-to-client



    return(

        <div className="h-screen">

            <h2>Your Chatroom</h2>

           <form id="formId" onSubmit={handleSubmit}
           className=" h-3/4 w-3/4 mx-auto border flex flex-col justify-end items-center relative">

                <div id="loginPopup" className="absolute top-7 right-10"></div>


                <div id="messageHolder" className="overflow-y-auto w-full"></div>
                


                <div className="w-full border-t-2 py-2">

                    <input
                    onChange={inputHandler}
                    id="chatInput"
                    name="content" 
                    className="border h-8 mr-2" 
                    type="text"
                    />   

                    <button name="content" className="border">Start Chatting</button>

                </div>


           </form>

        </div>
    )
}


export default ChatWindow;