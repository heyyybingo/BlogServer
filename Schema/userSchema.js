let Schema = require("./Schema")

let userSchema = new Schema({
    avatar:{
        type: String,
        default:null
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // github: {
    //     type: String,
    //     required: false,
    //     default: null
    // },

    role: {
        type: Number,
        default: 0
    },
    state: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        default: null
    },
    registerTime: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


module.exports = userSchema;