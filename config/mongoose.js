//Require library mongoose
const dotenv=require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
//Connect to mongoose
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true});
//Acquire Connection
const connection=mongoose.connection;
//Check Connection
connection.on('error',(err)=>{
    console.log(err);
});
connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
});
