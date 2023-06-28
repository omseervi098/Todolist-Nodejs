const express=require('express');
const moment=require('moment');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT;
//Imprt db and schema
const db=require('./config/mongoose');
const Task=require('./models/task');
//setting view engine to ejs
app.set('view engine','ejs');
app.set('views','./views');
//setting up body parser
app.use(express.urlencoded(
    {extended:true
    }));
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
        name:req.body.name.charAt(0).toUpperCase()+req.body.name.slice(1),  //capitalizing first letter of name
        category:req.body.category,
        date:(moment(req.body.date).format('ll')).toString(),  //moment libaration is used to convert date dd/mm/yyyy to month dd,yyyy
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
//setting path for toggling task status
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
//This Sort List By their date in ascending order
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
//This Sort List By their name
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
//This brings original list
app.get('/keep-same',(req,res)=>{
    return res.redirect('/');
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
