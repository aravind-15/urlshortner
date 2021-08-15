var express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const shortid = require('shortid');
//var shorturl= require("../models/shorturl.js");

const urlschema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shortid: { type: String, required: true },
    url: { type: String, required: true },
  });
  
 var shorturl = mongoose.model("shorturl", urlschema);

router.get('/:shortid', function(req,res){
    var id=req.params.shortid;
    console.log(id);
    shorturl.find({shortid :id }, function (err, data) {
        if(err){ res.status(400).json({msg:"Failed"}); }
        else if(data.length==0) { res.status(400).json({msg:"URL not found"}); }
        else {//console.log(data);
              res.status(200).json({msg: "URL retrieved",result: data});}
    });
})

router.post('/add', function(req,res){
    shorturl.find({url : req.body.url }, function (err, data) {
        if(err){ res.status(400).json({msg:"Failed"}); }
        else {//console.log(data);
              if(data.length>0)
              res.status(200).json({msg:"Saved Successful", result : data});
              else
              { var id=shortid.generate();
                //console.log(id);
                data={ _id: new mongoose.Types.ObjectId(),
                       shortid : id,
                       url : req.body.url,}
                var add= new shorturl(data);
                add.save(function(err,record) {
                if(err){
                    res.status(400).json({msg:"Failed to Created Insatnce"});} 
                else {
                     res.status(200).json({msg:"Saved Successful", result : data});
                     //console.log(data);
                   }
                });
              }
             }
    });
})

module.exports=router;
