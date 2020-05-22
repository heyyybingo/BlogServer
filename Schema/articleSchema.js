let Schema = require("./Schema")

let articleSchema = new Schema({
    title: {
        type: String,
        required: true
    }, //文章标题
    simpleContent: {
        type: String,
        required: true
    }, //简易内容
    content: {
        type: String,
        required: true
    }, //文章内容
    authorId: {
        type: String,
        required: true
    }, //作者
    createTime: {
        type: Date,
        default: Date.now()
    }, //发布时间，默认当前时间
    lastUpdateTime: {
        type: Date,
        default: Date.now()
    }, //最后更新时间
    hidden: {
        type: Boolean,
        default: false
    }, //是否隐藏，默认不隐藏
    favs: {
        type: Number,
        min: 0,
        default: 0
    }, //点赞量，默认0，初始0
    enters: {
        type: Number,
        min: 0,
        default: 0
    }, //浏览量，默认0，初始0
    tags: {
        type: [String],
        default: []
    } //标签，默认空数组                        
})

module.exports = articleSchema;