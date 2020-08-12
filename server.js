var express=require('express');
var app=express();
var dbconnect=require("./backend/dbconnect");
var config =require("./backend/library/config");
var users=require("./backend/library/users");
//middle ware
app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

dbconnect.connect((mssg)=>{
    console.log(mssg);
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/frontend/html/home.html");
})

app.get("/api/users",(req,res)=>{   
     users.getallusers((err,data)=>{
         if(err)
         console.log("error");
         res.json(data);
     })
})
app.post("/",(req,res)=>{
    console.log(req.body);
      res.redirect("/");
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
    console.log(req.body);
       users.createuser(req.body,(err,data)=>{
              if(err)
              console.log("FAILED TO ADD USER"+err);
              else
              console.log("USER ADDED"+JSON.stringify(data));
       })
       res.redirect("/");
})


////////////////////////////////////////////////////////////////////////////////////////////
app.listen(config.port,()=>{
    console.log("SERVER LISTENING ON PORT"+config.port);
})