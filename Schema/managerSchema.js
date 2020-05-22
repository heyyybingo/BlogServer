let Schema = require("./Schema")

let managerSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    }, //用户名,不重复
    password: {
        type: String,
        required: true
    }, //密码
    authority: {
        type: Number,
        required: true
    } //权限级别
})




module.exports = managerSchema