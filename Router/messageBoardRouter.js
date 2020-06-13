var messageBoardRouter = require("express").Router()
const MessageBoard = require("../Class/MessageBoard")
const messageBoardDao = require("../DAO/messageBoardDao")
const Comment = require("../Class/Comment")
const commentDao = require("../DAO/commentDao")

messageBoardRouter.post("/addBoard", (req, res) => {
    let boardId = req.body.boardId;
    let title = req.body.title;

    let msboard = new MessageBoard();
    msboard.setBoardId(boardId);
    msboard.setTitle(title);

    let mdao = new messageBoardDao();

    mdao.save(msboard).then(result => {

        console.log(result),
            res.status(200).send({
                state: "success",

            })
    }).catch(err => {
        if (err.code == 11000) {
            res.status(403).send()
            return
        }
        res.status(500).send()
    })
})
messageBoardRouter.post("/removeBoard", (req, res) => {
    let _id = req.body._id
    let boardId = req.body.boardId;
    if (boardId == 0) {
        res.status(403).send()
        return;
    }
    let msboard = new MessageBoard();
    msboard.setId(_id)
    let mdao = new messageBoardDao();
    mdao.findByIdAndRemove(msboard).then(result => {
        if (!result) {
            throw 1;
        }
        res.status(200).send({
            state: 'success'
        })
    }).catch(err => {
        if (err == 1) {
            res.status(404).send();
            return;
        }
        res.status(500).send();
    })
})

messageBoardRouter.post("/updateBoard", (req, res) => {
    let _id = req.body._id;
    let boardId = req.body.boardId;
    let title = req.body.title;
    let msboard = new MessageBoard()
    if (boardId == 0) {
        res.status(403).send()
        return;
    }
    msboard.setId(_id);
    msboard.setBoardId(boardId);
    msboard.setTitle(title);
    console.log(msboard)
    let mdao = new messageBoardDao();
    mdao.findByIdAndUpdate(msboard).then(result => {
        if (!result) {
            throw 1;
        }
        res.status(200).send({
            state: 'success'
        })
    }).catch(err => {
        if (err == 1) {
            res.status(404).send();
            return;
        }
        res.status(500).send();
    })
})
messageBoardRouter.get("/allBoards", (req, res) => {
    let mdao = new messageBoardDao()

    mdao.findAllBoard().then(result => {
        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

messageBoardRouter.get("/queryById", (req, res) => {
    let boardId = req.query.boardId;
    let page = req.query.page;
    let everyNum = req.query.everyNum;
    let msboard = new MessageBoard();
    msboard.setBoardId(boardId);

    let mdao = new messageBoardDao()
    mdao.findByboardId(msboard, page, everyNum).then(result => {
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
messageBoardRouter.post("/addComments", (req, res) => {
    let boardId = req.body.boardId;
    let userId = req.User._id;
    let content = req.body.content;
    let createTime = Date.now();

    let msboard = new MessageBoard()
    let comment = new Comment();

    msboard.setBoardId(boardId)
    // comment.setArticle(article);
    comment.setUser(userId);
    comment.setContent(content);
    comment.setCreateTime(createTime);
    console.log("comment", comment)

    let mdao = new messageBoardDao()
    let cdao = new commentDao();

    cdao.save(comment).then(com => {
        return mdao.findByBoardIdAndPush(msboard, com._id)
    }).then(result => {
        console.log(result)
        if (!result) {
            throw 1
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err.code == 11000) {
            res.status(404).send();
            return
        }
        res.status(500).send()
    })
})


module.exports = messageBoardRouter