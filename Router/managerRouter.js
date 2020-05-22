var managerRouter = require("express").Router()
const Manager = require("../Class/Manager")
const managerDao = require("../DAO/managerDao");

managerRouter.get("/getAuthor", (req, res) => {
    let authorId = req.query.authorId;
    console.log(authorId)
    let manager = new Manager();
    manager.setId(authorId);

    let mdao = new managerDao();

    mdao.findById(manager).then(result => {
        console.log(result);
        if (!result) {
            throw "notFound"
        }
        res.status(200).send({
            state: "success",
            data: result.userName
        })
    }).catch(err => {
        console.log(err)
        if (err == "notFound") {
            res.status(404).send();
            return;
        }
        res.status(500).send();
    })
})



module.exports = managerRouter