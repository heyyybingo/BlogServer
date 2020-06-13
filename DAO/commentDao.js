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
        }).populate('article').populate('user', 'userName').populate({
            path: 'replies',
            populate: {
                path: 'from',
                select: "userName"
            }
        }).populate({
            path: 'replies',
            populate: {
                path: 'to',
                select: "userName"
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
            }).skip(skipNum).limit(limitNum).populate('user', 'userName').populate({
                path: 'replies',
                populate: {
                    path: 'from',
                    select: "userName"
                }
            }).populate({
                path: 'replies',
                populate: {
                    path: 'to',
                    select: "userName"
                }
            })
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
}




module.exports = commentDao