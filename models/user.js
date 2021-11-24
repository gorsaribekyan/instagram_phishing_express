const {Schema, model} = require("mongoose")

const user = new Schema({
    login:{
        type:String, 
        required:true, 
        default:"*"
    },

    password:{
        type:String, 
        required:true, 
        default:"*"        
    },

    date:{
        type:Date,
        required:true, 
        default: new Date()
    }

})


module.exports = model('user', user)
