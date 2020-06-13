let mongoClient=require('../mongoClient')
let messageBoardSchema=require('../Schema/messageBoardSchema')

let messageBoardModel=mongoClient.model("messageBoard",messageBoardSchema)

module.exports=messageBoardModel