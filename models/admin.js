const {Schema, model} = require("mongoose")

const adminUser = new Schema({
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted'], required: true },
})




module.exports = model('adminUser', adminUser)
