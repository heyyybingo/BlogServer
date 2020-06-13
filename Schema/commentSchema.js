let Schema = require("./Schema")
let replySchema = require("./replySchema")
// let userSchema = require("./userSchema")
let commentSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,

        ref: 'article',
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',


    },
    content: {
        type: String,
        required: true
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'reply',
    }],
    createTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = commentSchema;