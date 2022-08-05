//Require library mongoose
const mongoose=require('mongoose');
//Connect to mongoose
mongoose.connect('mongodb://localhost/todo_app',{useNewUrlParser:true});
//Acquire Connection
const connection=mongoose.connection;
//Check Connection
connection.on('error',(err)=>{
    console.log(err);
});
connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
});
