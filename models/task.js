const mongoose=require('mongoose');
const moment=require('moment');
const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    category:{
        type:String,
    },
    date:{
        type:String,
    }
});
const Task=mongoose.model('Task',taskSchema);
module.exports=Task;