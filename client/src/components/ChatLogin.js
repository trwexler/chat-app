import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link, Router} from '@reach/router';
import io from 'socket.io-client';





const ChatLogin = (props)=>{

    const {socket} = props;

    const [userBase, setUserBase] = useState({
        userName:""
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
                navigate("/chat/");
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

            {/* {
                userBase.map((oneUser)=>(
                    <p key={oneUser._id}>Current user: {oneUser.userName}</p>
                ))
            } */}

            </form>
                    


        </div>
    )
}


export default ChatLogin;