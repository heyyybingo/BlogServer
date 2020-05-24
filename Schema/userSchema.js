let Schema = require("./Schema")

let userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    registerTime: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


module.exports = userSchema;