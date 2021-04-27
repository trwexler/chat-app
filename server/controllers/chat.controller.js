const Chat = require('../models/chat.model');    
         
module.exports = {


    
viewAllChats : (request, response) => {
    Chat.find({})
        .then((allChats)=> {
            console.log(allChats);
            response.json(allChats);
            })
        .catch(err =>{
            response.status(400).json(err);
            console.log("Problem in viewAllChats");
        })
},

createChat: (request, response) => {
    console.log(request.body);
    Chat.create(request.body)
        .then(newChat =>{ 
            response.json(newChat);
            console.log(newChat);
        })
        .catch(err =>{ 
            response.status(400).json(err);
            console.log("Problem in createChat");
        });
},

viewOneChat : (request, response) => {
    Chat.findById(request.params.id)
        .then((viewOne)=> {
            console.log(viewOne);
            response.json(viewOne);
            })
        .catch(err =>{
            response.status(400).json(err);
            console.log("Problem in viewAllChats");
        })
},


updateChat : (request, response) => {
    Chat.findByIdAndUpdate(request.params.id, request.body,
        {
        new: true, 
        runValidators:true,
    })
        .then((updatedChat)=> {
            console.log(updatedChat);
            response.json(updatedChat);
            })
        .catch(err =>{
            response.status(400).json(err);
            console.log("Problem in updateChat");
        })
},

deleteChat : (request, response) => {
    Chat.findByIdAndDelete(request.params.id)
        .then((deletedChat)=> {
            console.log(deletedChat);
            response.json(deletedChat);
            })
        .catch(err =>{
            response.status(400).json(err);
            console.log("Problem in deletedChat");
        })
}}