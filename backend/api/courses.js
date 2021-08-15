var express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var course= require("../models/course.js");

router.get('/', function(req,res){
    course.find({}, function (err, data) {
        if(err){ res.status(400).json({msg:"Failed"}); }
        else {//console.log(data);
              res.status(200).json(data);}
    });
})

router.post('/add', function(req,res){
    data={ _id: new mongoose.Types.ObjectId(),
           name : req.body.name,
           isactive : req.body.isactive,
           isdeleted : req.body.deleted,
        }
    var add= new course(data);
    add.save(function(err, data) {
        if(err){
          res.status(400).json({msg:"Failed to Created Insatnce"});} 
          else {
          res.status(200).json({msg:"Saved Successful"});
          console.log(data);
        }
      });
})

router.patch('/mark', function(req,res){
  console.log(req.body._id)
  course.find({_id:req.body._id}, function (err, data) {
   if(err){ res.status(400).json({msg:"Failed"}); }
   else { console.log(data);
          course.updateOne({ _id:req.body._id }, {isactive: false}, (err,data)=>
          {
           if(err){ res.status(400).json({msg:"Failed to Update"}); }
               else { 
                   //console.log(data);
                   res.status(200).json({msg:"Updated"});}
          }
          );
         }
});
})

router.patch('/remove', function(req,res){
   console.log(req.body._id)
   course.find({_id:req.body._id}, function (err, data) {
    if(err){ res.status(400).json({msg:"Failed"}); }
    else { console.log(data);
           course.updateOne({ _id:req.body._id }, {isdeleted: true}, (err,data)=>
           {
            if(err){ res.status(400).json({msg:"Failed to Update"}); }
                else { 
                    //console.log(data);
                    res.status(200).json({msg:"Updated"});}
           }
           );
          }
});
})

// router.patch('/remove', function(req,res){
//   console.log(req.body._id)
//    course.replaceOne({ _id:req.body._id }, { isdeleted: true },(err,data)=>{
//     if(err){ res.status(400).json({msg:"Failed to Update"}); }
//     else { 
//         //console.log(data);
//         res.status(200).json({msg:"Updated"});}
//   });
// })

module.exports=router;
