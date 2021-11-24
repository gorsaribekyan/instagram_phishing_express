const {Schema, model} = require("mongoose")

const score = new Schema({
    Id:{
        type:Number,
    },

    Name:{
        type:String
    }, 
    Score:{
        type:Number
    }
})

module.exports = model('score', score)
