let Schema=require("./Schema")

let tagsSchema=new Schema({
    tagName:{type:String,required:true},//标签名称
    hot:{type:Number,required:true}//标签热度
})

module.exports=tagsSchema