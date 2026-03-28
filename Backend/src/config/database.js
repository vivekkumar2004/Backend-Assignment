const mongoose = require('mongoose')

const ConnectToDb = async() =>
{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>
    {
        console.log("Database is connected");
        
    })
    .catch((err)=>
    {
        console.log(err);    
    })
}

module.exports = ConnectToDb;