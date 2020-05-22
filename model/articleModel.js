let mongoClient=require('../mongoClient')
let articleSchema=require('../Schema/articleSchema')

let articleModel=mongoClient.model("article",articleSchema)

module.exports=articleModel