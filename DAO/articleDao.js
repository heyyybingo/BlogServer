const articleModel = require('../model/articleModel')
const BaseDao = require("./BaseDao")


/**
 * 文章DAO层，
 * 额外需要的方法在这里定义
 */
class articleDao extends BaseDao {
    constructor(model = articleModel) {
        super(model)
    }

    findCount(obj) {
        let arr = [];
        for (let key in obj) {
            if (obj[key] == undefined) {
                delete obj[key]
            } else {
                // 正则匹配
                let o = {};
                o[key] = eval("/" + obj[key] + "/")
                arr.push(o)
                // obj[key] = eval("/" + obj[key] + "/");
            }
        }
        if (arr.length) {
            arr = {
                $or: arr
            }
        } else {
            arr = {}
        }

        console.log(arr)
        return this.model.count(arr)
    }
    findByPageAndEveryNum(page, everyNum, obj) {
        // 仅返回包含标题，简易内容，标签，点赞量，浏览量
        // 该函数根据创建的id顺序逆序返回值
        let skipNum = page > 1 ? (page - 1) * everyNum : 0
        let limitNum = parseInt(everyNum)
        // let sort = [
        //     ['_id', -1]
        // ]
        let arr = []
        for (let key in obj) {
            if (obj[key] == undefined) {
                delete obj[key]
            } else {
                // 正则匹配
                // obj[key] = eval("/" + obj[key] + "/");
                let o = {};
                o[key] = eval("/" + obj[key] + "/")
                arr.push(o)

            }
        }
        if (arr.length) {
            arr = {
                $or: arr
            }
        } else {
            arr = {}
        }
        return this.model.find(arr, "title simpleContent favs enters tags lastUpdateTime").sort({
            _id: -1
        }).skip(skipNum).limit(limitNum)
    }

    findByIdAndIncFavs(_id) {
        return this.model.findByIdAndUpdate(_id, {
            $inc: {
                favs: 1
            }
        })
    }
    findByIdAndIncEnters(_id) {
        return this.model.findByIdAndUpdate(_id, {
            $inc: {
                enters: 1
            }
        })
    }


}


module.exports = articleDao