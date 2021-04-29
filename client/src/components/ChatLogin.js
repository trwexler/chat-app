import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';





const ChatLogin = (props)=>{

    const {socket, currentUser, setCurrentUser} = props;

    const [userBase, setUserBase] = useState({
        userName:"",

    });

    //? Will need to grab whole db either now or in ChatWindow
    //? For now. will try JUST post here:
    // useEffect(()=>{
    //     axios.get('http://localhost:8000/api')
    //         .then((response)=>{
    //             console.log(response.data);
    //             setUserBase(response.data);
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })
    // })


    const inputHandler = (e)=>{
        let stateHolder = {...userBase};
        stateHolder[e.target.name] = e.target.value;
        setUserBase(stateHolder);
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/chat', userBase)
            .then((response)=>{
                console.log(response.data);
                setUserBase(response.data);
                setCurrentUser({
                    userName:response.data.userName,
                    id:response.data._id
                });
                // console.log(userBase[userBase.length-1]);
                console.log(currentUser);
                console.log(response.data._id);
                console.log(response.data.userName);

                socket.emit('new_login', response.data.userName);


                navigate("/chat/"+response.data._id);
            })
            .catch((err)=>{
                console.log(err);
            })   
            
            

    }

    return(
        <div>

            <h2>Get started right now!</h2>

            <form onSubmit={submitHandler}>

                <p className="text-red-500">
                I want to do some chatting with the name:
                </p>

                <input name="userName" className="border" type="text" placeholder="My name..."
                onChange={inputHandler}
                />
                <button>Click</button>


            </form>
                    


        </div>
    )
}


export default ChatLogin;