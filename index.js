const express=require('express');
const moment=require('moment');
const app=express();
const port=3000;
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
    //console.log(taskList[0]);
    res.render('index',{
        Task_list:taskList,
        moment:moment
    });
});
//setting path for adding task
app.post('/create-task',(req,res)=>{
    //console.log(req.body);
    taskList.push({
        id:taskList.length+1,
        name:req.body.name,
        category:req.body.category,
        date:req.body.date,
        status:false
    });
    return res.redirect('/');
});
//setting path for marking task as done
app.get('/update-task',(req,res)=>{
    //console.log(req.query.id);
    taskList.forEach(task=>{
        if(task.id==req.query.id){  
            task.status=!task.status;
        }
    });
    return res.redirect('/');
})
//setting path for deleting task
app.get('/delete-task',(req,res)=>{
    //console.log(req.body);
    taskList=taskList.filter((task)=>{
        return task.status==false;
    });
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