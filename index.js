const express=require('express');
const moment=require('moment');
const app=express();
const port=3000;
const db=require('./config/mongoose');
const Task=require('./models/task');
//datastucture to store list of tasks
var taskList=[
    {id:1,name:'Why not to add task?',status:true,category:'work',date:'May 1, 2022'},
    {id:2,name:'Lets make TODO App',status:false,category:'college',date:'May 1, 2022'},
    {id:3,name:'Get vegetables',status:true,category:'family',date:'May 1, 2022'},
];
//setting view engine to ejs
app.set('view engine','ejs');
app.set('views','./views');
//setting up body parser
app.use(express.urlencoded());
//setting assets folder as static folder
app.use(express.static('./assets'));
//setting root path
app.get('/',(req,res)=>{
    Task.find({},(err,tasks)=>{
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }
        return res.render('index',{
            Task_list:tasks
        });
    })
});
//setting path for adding task
app.post('/create-task',(req,res)=>{
    Task.create({
        name:req.body.name.charAt(0).toUpperCase()+req.body.name.slice(1),
        category:req.body.category,
        date:(moment(req.body.date).format('ll')).toString(), 
        status:false
    },(err,newTask)=>{
        if(err){
            console.log('Error in creating task');
            return;
        }
        console.log('Task created successfully');
        return res.redirect('back');
    })
});
//setting path for marking toggling task status
app.get('/update-task',(req,res)=>{
    Task.findById(req.query.id,(err,task)=>{
        task.status=!task.status;
        task.save((err,updatedtask)=>{
            if(err){
                console.log('Error in updating task');
                return;
            }
            console.log('Task updated successfully');
            return res.redirect('back');
        }); 
    });
})
//setting path for deleting task
app.get('/delete-task',(req,res)=>{
    Task.deleteMany({status:true},(err)=>{
        if(err){
            console.log('Error in deleting task');
            return;
        }
        console.log('Task deleted successfully');
        return res.redirect('back');
    })
})
//Setting for sorting tasks
app.get('/sort-by-date',(req,res)=>{
    Task.find({},(err,tasks)=>{
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }
        return res.render('index',{
            Task_list:tasks
        });
    }).sort({date:1});
})
app.get('/sort-by-name',(req,res)=>{
    Task.find({},(err,tasks)=>{
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }
        return res.render('index',{
            Task_list:tasks
        });
    }).sort({name:1});
})
//Listening to the port
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server is running on port ${port}`);
    }
})