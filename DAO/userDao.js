const userModel = require("../model/userModel");
const BaseDao = require("./BaseDao")


class userDao extends BaseDao {
    constructor(model = userModel) {
        super(model)
    }

    findByNameAndPassword(obj) {
        try {
            let userName = obj.getUserName();
            let password = obj.getPassword();
            console.log(userName, password)
            return this.model.find({
                userName,
                password
            })

        } catch (err) {
            console.log(err)
        }

    }

}




module.exports = userDao