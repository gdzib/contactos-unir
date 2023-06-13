const mongoose = require("mongoose")

const TracksSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        album:{
            type:String
        }, 
 
        artist:{
            type:String
        }, 
    }
);

module.exports = mongoose.model("tracks", TracksSchema)
