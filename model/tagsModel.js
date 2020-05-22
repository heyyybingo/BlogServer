let mongoClient=require('../mongoClient')
let tagsSchema=require('../Schema/tagsSchema')

let tagsModel=mongoClient.model("tags",tagsSchema)

module.exports=tagsModel