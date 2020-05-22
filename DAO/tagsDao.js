const tagsModel = require("../model/tagsModel")
const BaseDao = require("./BaseDao")


/**
 * 标签DAO层，
 * 额外需要的方法在这里定义
 */
class tagsDao extends BaseDao {
    constructor(model = tagsModel) {
        super(model)
    }
    findByPageAndEveryNum(page, everyNum) {
        let skipNum = page > 1 ? (page - 1) * everyNum : 0
        let limitNum = parseInt(everyNum)
        // let sort = [
        //     ['_id', -1]
        // ]
        return this.model.find({}).sort({
            _id: -1
        }).skip(skipNum).limit(limitNum)
    }
}

module.exports = tagsDao