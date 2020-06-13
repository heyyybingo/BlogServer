let Schema = require("./Schema")

let replySchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    content: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
})



module.exports = replySchema;