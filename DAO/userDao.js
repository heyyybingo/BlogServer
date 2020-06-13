const userModel = require("../model/userModel");
const BaseDao = require("./BaseDao")


class userDao extends BaseDao {
    constructor(model = userModel) {
        super(model)
    }

    findManagerByNameAndPassword(obj) {
        try {
            let userName = obj.getUserName();
            let password = obj.getPassword();
            let role = {
                $gte: 1
            }
            let state = true
            console.log(userName, password)
            return this.model.find({
                userName,
                password,
                role,
                state
            })

        } catch (err) {
            console.log(err)
        }

    }

    findUserByNameAndPassword(obj) {
        try {
            let userName = obj.getUserName();
            let password = obj.getPassword();
            let role = 0;
            let state = true;
            console.log(userName, password)
            return this.model.find({
                userName,
                password,
                role,
                state
            })

        } catch (err) {
            console.log(err)
            throw err;
        }

    }
    findUser(page, everyNum, obj) {
        let skipNum = page > 1 ? (page - 1) * everyNum : 0
        let limitNum = parseInt(everyNum)

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
        arr["role"] = 0
        // arr["userName"] = {
        //     $not: {
        //         $eq: "root"
        //     }
        // }
        console.log(arr)
        return this.model.find(arr).skip(skipNum).limit(limitNum)
    }


    findManager(role, page, everyNum, obj) {
        let skipNum = page > 1 ? (page - 1) * everyNum : 0
        let limitNum = parseInt(everyNum)

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
        arr["role"] = {
            $gte: 1,
            $lt: role
        }
        // arr["userName"] = {
        //     $not: {
        //         $eq: "root"
        //     }
        // }
        console.log(arr)
        return this.model.find(arr).skip(skipNum).limit(limitNum)
    }

}




module.exports = userDao