const replyModel = require("../model/replyModel")
const BaseDao = require("./BaseDao")



class replyDao extends BaseDao {
    constructor(model = replyModel) {
        super(model)
    }

}




module.exports = replyDao