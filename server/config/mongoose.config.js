const mongoose = require('mongoose');

const db_name = "chat-app";

mongoose.connect("mongodb://localhost/" + db_name,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(()=>console.log("Successfully connected to DB:" + db_name))

    .catch((err)=>console.log(err));