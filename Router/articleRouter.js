var articleRouter = require("express").Router()
const Article = require("../Class/Article")
const articleDao = require("../DAO/articleDao")

/**
 * 查询用户文章
 */

articleRouter.post("/users", (req, res) => {
    let id = req.User._id;
    console.log("id", id);
    let article = new Article();
    article.setAuthor(id);
    let adao = new articleDao();
    adao.findByAuthor(article).then(result => {
        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })

})
/**
 * 查询文章总数
 */
articleRouter.get("/queryCount", (req, res) => {
    let title = req.query.title;
    let simpleContent = req.query.simpleContent;
    let tags = req.query.tags;

    let article = new Article();
    article.setTitle(title);
    article.setSimpleContent(simpleContent);
    article.setTags(tags);

    let adao = new articleDao();
    adao.findCount(article).then(count => {
        console.log(count)
        res.status(200).send({
            state: "success",
            data: count
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

/**
 * 查询文章列表
 */
articleRouter.get("/queryList", (req, res) => {
    let page = req.query.page
    let everyNum = req.query.everyNum;
    console.log(page, everyNum);
    let title = req.query.title;
    let simpleContent = req.query.simpleContent;
    let tags = req.query.tags;

    let article = new Article();
    article.setTitle(title);

    article.setSimpleContent(simpleContent);
    article.setTags(tags);

    console.log(article)
    // 创建dao实例查询数据库
    let adao = new articleDao();
    adao.findByPageAndEveryNum(page, everyNum, article).then(result => {
        console.log(result);
        // result.forEach(element => {
        //     element.toJSON()
        // });
        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send()

    })
})
/**
 * 查询文章内容
 */
articleRouter.get("/query", (req, res) => {
    let articleId = req.query._id;

    // 创建文章实例
    let article = new Article();

    article.setId(articleId);

    //创建dao对象
    let adao = new articleDao();
    adao.findById(article).then(result => {
        console.log(result)
        if (!result) {
            throw 1;
        }
        res.status(200).send({
            state: "success",
            data: result
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

articleRouter.get("/querySimple", (req, res) => {
    let articleId = req.query._id;

    // 创建文章实例
    let article = new Article();

    article.setId(articleId);

    //创建dao对象
    let adao = new articleDao();
    adao.findSimpleById(article).then(result => {
        console.log(result)
        if (!result) {
            throw 1;
        }
        res.status(200).send({
            state: "success",
            data: result
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
/**
 * 创建文章 
 */
articleRouter.post("/create", (req, res) => {
    let title = req.body.title;
    let simpleContent = req.body.simpleContent;
    let content = req.body.content;
    let author = req.User._id;
    let createTime = Date.now();
    let lastUpdateTime = createTime
    let tags = req.body.tags;

    // 创建文章实例
    let article = new Article()
    article.setAuthor(author);
    article.setTitle(title);
    article.setSimpleContent(simpleContent)
    article.setContent(content);
    article.setCreateTime(createTime);
    article.setLastUpdateTime(lastUpdateTime)
    article.setTags(tags)
    console.log(article)
    // 创建dao实例进行数据库交互
    let adao = new articleDao();
    adao.create(article).then(result => {
        // console.log(result)

        res.status(200).send({
            state: "success",
            data: result._id
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
    // res.send("article")
})

articleRouter.post("/update", (req, res) => {
    let articleId = req.body._id;
    let title = req.body.title;
    let simpleContent = req.body.simpleContent;
    let content = req.body.content;
    let lastUpdateTime = Date.now();
    let tags = req.body.tags;

    // 创建文章对象
    let article = new Article();
    article.setId(articleId);
    article.setTitle(title);
    article.setSimpleContent(simpleContent)
    article.setContent(content);
    article.setLastUpdateTime(lastUpdateTime);
    article.setTags(tags);
    console.log("update-article-before", article)
    // 创建dao对象进行删除操作
    let adao = new articleDao();
    adao.findByIdAndUpdate(article).then(result => {
        // console.log(result)
        if (result == null) {
            throw "notFound"
        }
        console.log("update-article-after", result)
        res.status(200).send({
            state: "success",
            data: result._id
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

articleRouter.post("/remove", (req, res) => {
    let articleId = req.body._id;

    // 创建文章对象
    let article = new Article();
    article.setId(articleId);

    // 创建dao对象进行删除操作
    let adao = new articleDao();
    adao.findByIdAndRemove(article).then(result => {
        // console.log(result)
        if (result == null) {
            throw "notFound"
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



articleRouter.get("/addFavs", (req, res) => {
    let _id = req.query._id;

    let adao = new articleDao();
    adao.findByIdAndIncFavs(_id).then(result => {
        console.log(result.favs)
        res.status(200).send({
            state: "success",

        })
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

articleRouter.get("/addEnters", (req, res) => {
    let _id = req.query._id;

    let adao = new articleDao();
    adao.findByIdAndIncEnters(_id).then(result => {
        console.log(result.enters)
        res.status(200).send({
            state: "success",

        })
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

module.exports = articleRouter