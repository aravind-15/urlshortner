var express = require('express');
const router = express.Router();

var a=[]

router.get('/', function(req,res){
     //console.log(a);
    res.json(a);

})
router.post('/todos', function(req,res){
    a.push(req.body);
    //console.log(a);
    res.json(a);

})

router.patch('/mark', function(req,res){
    console.log(req.body)
    a[req.body.index].isactive=false;
    //console.log(a);
    res.json(a);
})

router.patch('/remove', function(req,res){
    console.log(req.body.index)
    a[req.body.index].isdeleted=true;
    //console.log(a);
    res.json(a);
})


module.exports=router;