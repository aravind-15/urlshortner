var express=require('express');
var app=express();
var dbconnect=require("./backend/dbconnect");
var config =require("./backend/library/config");
var users=require("./backend/library/users");
//middle ware
app.use(express.static('frontend'));
app.use(express.json());

dbconnect.connect((mssg)=>{
    console.log(mssg);
});
app.get("/",(req,res)=>{
    res.send("helllo");
})

app.get("/api/users",(req,res)=>{
     users.getallusers((err,data)=>{
         res.json(data);
     })
})
app.get("/api/users/:id",(req,res)=>{
           users.getuser(req.params.id,(err,data)=>{
                if(err){
                    console.log("FAILED TO FIND USER");
                }
                else
                res.json(data);
           })  
})
app.post('/api/users/create',(req,res)=>{
       users.createuser(req.body,(err,data)=>{
              if(err)
              console.log("FAILED TO ADD USER"+err);
              else
              console.log("USER ADDED"+JSON.stringify(data));
       })
})


////////////////////////////////////////////////////////////////////////////////////////////
app.listen(config.port,()=>{
    console.log("SERVER LISTENING ON PORT"+config.port);
})