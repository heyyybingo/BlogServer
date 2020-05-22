var tagsRouter = require("express").Router()
const tagsDao = require("../DAO/tagsDao")
const Tags = require("../Class/Tags")
tagsRouter.get("/query", (req, res) => {
    let page = req.query.page
    let everyNum = req.query.everyNum;
    console.log(page, everyNum)
    let tdao = new tagsDao();
    tdao.findByPageAndEveryNum(page, everyNum).then(result => {
        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })

})

tagsRouter.post("/create", (req, res) => {
    let tagName = req.body.tagName;
    let hot = 0;

    let tags = new Tags();
    tags.setTagName(tagName);
    tags.setHot(hot);

    let tdao = new tagsDao();

    tdao.create(tags).then(result => {
        console.log(result);
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

tagsRouter.post("/remove", (req, res) => {
    let tagId = req.body.tagId;

    let tags = new Tags();
    tags.setId(tagId);

    let tdao = new tagsDao();
    tdao.findByIdAndRemove(tags).then(result => {
        if (result == null) {
            throw "notFound";
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == "notFound") {
            res.status(404).send()
        } else {
            res.status(500).send();
        }
    })

})


tagsRouter.post("/update", (req, res) => {
    let tagId = req.body.tagId;
    let tagName = req.body.tagName;
    let hot = req.body.hot;

    let tags = new Tags();
    tags.setId(tagId);
    tags.setTagName(tagName);
    tags.setHot(hot)

    let tdao = new tagsDao;

    tdao.findByIdAndUpdate(tags).then(result => {
        console.log(result)
        if (result == null) {
            throw "notFound"
        }
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err == "notFound") {
            res.status(404).send();
        } else {
            res.status(500).send();
        }
    })

})



module.exports = tagsRouter