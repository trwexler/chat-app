const ChatController = require('../controllers/chat.controller');


module.exports = function(app){
    app.get('/api', ChatController.viewAllChats);
    app.post('/api/chat', ChatController.createChat);
    app.get('/api/chat/:id', ChatController.viewOneChat);
    app.put('/api/chat/:id', ChatController.updateChat);
    app.delete('/api/chat/:id', ChatController.deleteChat);
}

