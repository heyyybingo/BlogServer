let mongoClient = require('../mongoClient')
let commentSchema = require('../Schema/commentSchema')

let commentModel = mongoClient.model("comment", commentSchema)

module.exports = commentModel