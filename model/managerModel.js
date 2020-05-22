let mongoClient=require('../mongoClient')
let managerSchema=require('../Schema/managerSchema')

let managerModel=mongoClient.model("manager",managerSchema)

module.exports=managerModel