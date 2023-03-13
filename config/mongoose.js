//Require library mongoose
const mongoose=require('mongoose');
//Connect to mongoose
mongoose.connect(`mongodb://0.0.0.0:$PORT/todo_app`,{useNewUrlParser:true});
//Acquire Connection
const connection=mongoose.connection;
//Check Connection
connection.on('error',(err)=>{
    console.log(err);
});
connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
});
