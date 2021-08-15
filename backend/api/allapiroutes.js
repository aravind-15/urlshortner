var express = require('express');
const app = express.Router();
var todo= require('./todo.js');
var course= require('./courses.js');
var shorturl=require('./urlshorter');

app.use("/todo",todo);
app.use("/course",course);
app.use("/shorturl",shorturl);

module.exports=app;