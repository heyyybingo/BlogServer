let mongoClient = require('../mongoClient')
let replySchema = require('../Schema/replySchema')

let replyModel = mongoClient.model("reply", replySchema)

module.exports = replyModel