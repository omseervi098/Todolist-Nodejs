const express=require('express');
const app=express();
const port=3000;
//datastucture to store list of tasks
var taskList=[
    {name:'Why not to add task?',status:false,category:'Work',date:'May 1, 2022'},
    {name:'Lets make TODO App',status:false,category:'College',date:'May 1, 2022'},
    {name:'Get vegetables',status:false,category:'Personal',date:'May 1, 2022'},
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
    res.render('index',{Task_list:taskList});
});
//setting path for adding task
app.post('/create-task',(req,res)=>{
    console.log(req.body);
    taskList.push({
        name:req.body.name,
        category:req.body.category,
        date:req.body.date,
        status:false
    });
    return res.redirect('/');
});
//Listening to the port
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server is running on port ${port}`);
    }
})