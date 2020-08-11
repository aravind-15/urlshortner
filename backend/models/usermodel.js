var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    id:{
       type: Number,
       required:true,
       unique :true
    },
    name: {
        type:String,
        required:true
    },
    age :Number,
    mobile : String
})

module.exports = mongoose.model("user",userSchema);