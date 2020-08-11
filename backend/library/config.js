const { mongo } = require("mongoose");

module.exports={
    port: process.env.PORT || 5000,
    db_connectionstring : process.env.CONNECTION_STRING || 'mongodb://localhost:27017/userDB'
}