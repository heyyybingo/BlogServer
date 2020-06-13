var comRepRouter = require("express").Router()
const Comment = require("../Class/Comment")
const commentDao = require("../DAO/commentDao")

const Reply = require("../Class/Reply")
const replyDao = require("../DAO/replyDao")

comRepRouter.get("/queryList", (req, res) => {
    let page = req.query.page;
    let everyNum = req.query.everyNum;

    let cdao = new commentDao();
    cdao.findByPageAndEveryNum(page, everyNum).then(result => {
        console.log(result);
        res.status(200).send({
            state: "success",
            data: result
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

comRepRouter.get("/articleComments", (req, res) => {
    let page = req.query.page;
    let everyNum = req.query.everyNum;
    let article = req.query.article;

    let comment = new Comment();
    comment.setArticle(article);
    console.log(comment)
    let comdao = new commentDao();
    comdao.findByArticle(comment, page, everyNum).then(result => {
        console.log(result)

        res.status(200).send({
            state: "success",
            data: result
        })

    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

comRepRouter.post("/addComment", (req, res) => {
    let article = req.body.article;
    let userId = req.User._id;
    let content = req.body.content;
    let createTime = Date.now();

    let comment = new Comment();
    comment.setArticle(article);
    comment.setUser(userId);
    comment.setContent(content);
    comment.setCreateTime(createTime);
    console.log('comment:', comment)
    let cdao = new commentDao();
    cdao.save(comment).then(result => {
        console.log(result)
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send()
    })
})
comRepRouter.post("/removeComment", (req, res) => {
    let commentId = req.body.commentId;
    let comment = new Comment();
    comment.setId(commentId);
    let cdao = new commentDao();
    cdao.findByIdAndRemove(comment).then(result => {
        console.log(result)
        if (!result) {
            throw 1
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == 1) {
            res.status(404).send()
            return;
        }
        res.status(500).send()
    })
})
comRepRouter.post("/updateComment", (req, res) => {
    let commentId = req.body.commentId;
    let content = req.body.content;
    let comment = new Comment();
    comment.setId(commentId);
    comment.setContent(content)
    let cdao = new commentDao();
    cdao.findByIdAndUpdate(comment).then(result => {
        console.log(result)
        if (!result) {
            throw 1
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == 1) {
            res.status(404).send()
        }
        res.status(500).send()
    })
})
comRepRouter.post("/addReply", (req, res) => {
    let commentId = req.body.commentId;
    let from = req.User._id;
    let to = req.body.to;
    let content = req.body.content;
    let createTime = Date.now()


    let reply = new Reply();
    reply.setFrom(from);
    reply.setTo(to);
    reply.setContent(content);
    reply.setCreateTIme(createTime);


    let comment = new Comment();
    comment.setId(commentId);
    let cdao = new commentDao();
    let rdao = new replyDao();

    let com = null;
    let rep = null;
    cdao.findById(comment).then(result => {
        // 找到一个可以插入的位置

        if (result) {
            com = result
            console.log(com)
            return rdao.save(reply)

        } else {
            // 无
            throw 1
        }
    }).then(result => {
        rep = result
        console.log(rep)
        com.replies.push(rep._id);

        return cdao.findByIdAndPushReply(comment, rep._id)


    }).then(result => {
        console.log(result)
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == 1) {
            res.status(404).send();
            return;
        }
        res.status(500).send();
    })
})
comRepRouter.post("/removeReply", (req, res) => {
    let replyId = req.body.replyId;
    let reply = new Reply();

    reply.setId(replyId);

    let rdao = new replyDao();
    rdao.findByIdAndRemove(reply).then(result => {
        console.log(result)
        if (!result) {
            throw 1
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == 1) {
            res.status(404).send();
            return;
        }
        res.status(500).send()
    })
})
comRepRouter.post("/updateReply", (req, res) => {
    let replyId = req.body.replyId;
    let content = req.body.content;
    let reply = new Reply();
    reply.setId(replyId);
    reply.setContent(content)
    let rdao = new replyDao()
    rdao.findByIdAndUpdate(reply).then(result => {
        console.log(result)
        if (!result) {
            throw 1
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == 1) {
            res.status(404).send()
        }
        res.status(500).send()
    })
})
module.exports = comRepRouter