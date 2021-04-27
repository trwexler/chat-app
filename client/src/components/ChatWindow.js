import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';





const ChatWindow = (props)=>{

    const {userBase, setUserBase, socket} = props;
    

    // const [allMessages, setAllMessages]= useState([])

    const[messages, setMessages] = useState([""]);



    const inputHandler = (e)=>{
        setMessages(e.target.value);

        console.log(messages);
    }

    // useEffect(()=>{
    //     console.log("Inside useEffect for Socket.io-client");

    //     socket.on("new_message", (data) =>{
    //         socket.emit('new_message', ()=>{
    //             document.getElementById('messageHolder').appendChild(newMsg)
    //         })
    //         })

    //     },[]);



    const handleSubmit = (e)=>{
        e.preventDefault();
        let newMsg = document.createElement("p");
        newMsg.innerHTML = document.getElementById('chatInput').value;
        newMsg.classList.add("newMessage");
        document.getElementById('messageHolder').appendChild(newMsg);
        
    
    }




    return(
        <div className="h-screen">

            <h2>Your Chatroom</h2>

           <form id="formId" onSubmit={handleSubmit}
           className=" h-3/4 w-3/4 mx-auto border flex flex-col justify-end items-center">

                <div id="messageHolder" className="overflow-y-scroll w-full"></div>


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