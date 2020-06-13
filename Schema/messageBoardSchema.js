let Schema = require("./Schema")

let messageBoardSchema = new Schema({
    boardId: {
        type: String,
        require: true,
        unique: true,
        index: true

    },
    title: {
        type: String,
        require: true,
        unique: true,
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: Schema.Types.ObjectId,

        ref: 'comment',
    }]
})

module.exports = messageBoardSchema