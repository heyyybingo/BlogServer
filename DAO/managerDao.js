const managerModel = require("../model/managerModel")
const BaseDao = require("./BaseDao")


/**
 * 管理员DAO层，
 * 额外需要的方法在这里定义
 */
class managerDao extends BaseDao {
    constructor(model = managerModel) {
        super(model)
    }
    // findByName(obj) {
    //     try {
    //         let userName = obj.getUserName

    //         return this.model.find({
    //             userName
    //         })

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    findByNameAndPassword(obj) {
        try {
            let userName = obj.getUserName();
            let password = obj.getPassword();
            // console.log(userName, password)
            return this.model.find({
                userName,
                password
            })

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = managerDao