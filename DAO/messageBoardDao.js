const messageBoardModel = require("../model/messageBoardModel")
const BaseDao = require("./BaseDao")


/**
 * 标签DAO层，
 * 额外需要的方法在这里定义
 */
class messageBoardDao extends BaseDao {
    constructor(model = messageBoardModel) {
        super(model)
    }
    findAllBoard() {
        return this.model.find({}, "_id boardId title createTime").sort({
            boardId: 1
        })
    }
    findByboardId(obj, page, everyNum) {
        try {
            let skipNum = page > 1 ? (page - 1) * everyNum : 0
            let limitNum = parseInt(everyNum)
            console.log(skipNum, limitNum)
            let find = {
                boardId: obj.getBoardId()
            }
            return this.model.findOne(find).populate({
                path: "comments",
                populate: [{
                        path: "user",
                        select: 'userName',
                    }, {

                        path: "replies",
                        populate: [{
                                path: "from",
                                select: "userName"
                            },
                            {
                                path: "to",
                                select: "userName"
                            }
                        ]
                    }

                ],

                options: {
                    skip: skipNum,
                    limit: limitNum
                }
            })
            // }).populate({
            //     path: "comments",
            //     populate: {
            //         path: "replies",
            //         populate: {
            //             path: "from",
            //             select: "userName"
            //         }
            //     }
            // }).populate({
            //     path: "comments",
            //     populate: {
            //         path: "replies",
            //         populate: {
            //             path: "to",
            //             select: "userName"
            //         }
            //     },

            // }).populate({
            //     path: "comments",

            // })
        } catch (err) {
            throw err
        }
    }
    findByBoardIdAndPush(obj, comment) {
        try {
            let find = {
                boardId: obj.getBoardId()
            }
            return this.model.findOneAndUpdate(find, {
                $push: {
                    'comments': comment
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = messageBoardDao