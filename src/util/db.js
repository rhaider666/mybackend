const mongoose = require('mongoose')

const dbconn= mongoose.connect('mongodb://localhost:27017/tracure')
.then(()=>{console.log("database connected")})
.catch((err)=>{console.log("Error in db connection",err)})

module.exports = dbconn