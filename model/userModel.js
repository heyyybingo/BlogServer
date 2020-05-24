let mongoClient = require('../mongoClient')
let userSchema = require('../Schema/userSchema')

let userModel = mongoClient.model("user", userSchema)


module.exports = userModel;