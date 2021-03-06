const commentModel = require("../model/commentModel")
const BaseDao = require("./BaseDao")



class commentDao extends BaseDao {
    constructor(model = commentModel) {
        super(model)
    }
    findByPageAndEveryNum(page, everyNum) {
        let skipNum = page > 1 ? (page - 1) * everyNum : 0
        let limitNum = parseInt(everyNum)
        // let sort = [
        //     ['_id', -1]
        // ]

        return this.model.find({
            article: {
                "$ne": null
            }
        }).sort({
            _id: -1
        }).populate('article').populate('user', 'userName role avatar').populate({
            path: 'replies',
            populate: {
                path: 'from',
                select: "userName role avatar"
            }
        }).populate({
            path: 'replies',
            populate: {
                path: 'to',
                select: "userName role avatar"
            }
        }).sort({
            _id: -1
        }).skip(skipNum).limit(limitNum)
    }
    findByArticle(obj, page, everyNum) {
        try {
            let article = obj.getArticle()
            let skipNum = page > 1 ? (page - 1) * everyNum : 0
            let limitNum = parseInt(everyNum)
            return this.model.find({
                article
            }).sort({
                _id: -1
            }).skip(skipNum).limit(limitNum).populate([{
                    path: "user",
                    select: 'userName role avatar',
                }, {

                    path: "replies",
                    populate: [{
                            path: "from",
                            select: "userName role avatar"
                        },
                        {
                            path: "to",
                            select: "userName role avatar"
                        }
                    ],
                    options: {
                        sort: {
                            _id: -1
                        }
                    }
                }

            ])
        } catch (err) {
            throw err
        }

    }
    findByIdAndPushReply(obj, reply) {
        return this.model.findByIdAndUpdate(obj.getId(), {
            $push: {
                'replies': reply
            }
        })
    }
    findByIdAndPullReply(obj, reply) {
        return this.model.findByIdAndUpdate(obj.getId(), {
            $pull: {
                'replies': reply
            }
        })
    }
}




module.exports = commentDao