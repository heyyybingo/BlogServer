var loginRouter = require("express").Router()
var Manager = require("../Class/Manager")
var managerDao = require("../DAO/managerDao")

var User = require("../Class/User");
var userDao = require("../DAO/userDao");
// token验证
const jwt = require('jsonwebtoken');
const tokenConfig = require("../tokenConfig");

loginRouter.post("/account/managerLogin", (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    let manager = new Manager();
    manager.setUserName(userName);
    manager.setPassword(password)
    console.log(manager)
    let mdao = new managerDao();

    mdao.findByNameAndPassword(manager).then(result => {
        console.log(result)
        let find = result[0]
        console.log(find)
        if (find) {

            // 存在，匹配成功
            // 1.生成token
            let token = jwt.sign(find.toJSON(), tokenConfig.key, tokenConfig.options)
            // 2.返回请求W
            res.status(200).send({
                state: "success",
                data: token
            })


        } else {
            res.status(403).send()
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })


})
loginRouter.post("/testLogin", (req, res) => {
    res.status(200).send()
})
loginRouter.post("/account/managerReg", (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    let authority = req.body.authority
    let manager = new Manager();
    manager.setUserName(userName);
    manager.setPassword(password)
    manager.setAuthority(authority)
    let mdao = new managerDao();
    mdao.save(manager).then(result => {
        console.log(result)
        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err);
        if (err.code == 11000) {
            // 存在,拒绝执行
            res.status(403).send()
        }
        res.status(500).send()
    })


})

loginRouter.post("/account/userReg", (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let github = req.body.github;
    let email = req.body.email;

    let user = new User();
    user.setUserName(userName);
    user.setPassword(password);
    user.setGithub(github);
    user.setEmail(email);

    let udao = new userDao();
    udao.save(user).then(result => {
        console.log('success', result)
        res.status(200).send();
    }).catch(err => {
        console.log('err', err);
        if (err.code == 11000) {
            console.log("userName dup");
            res.status(403).send({
                result: "Duplicate"
            })
        }
        res.status(500).send();
    })
})

loginRouter.post("/account/userLogin", (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    let user = new User();
    user.setUserName(userName);
    user.setPassword(password);


    let udao = new userDao()
    udao.findByNameAndPassword(user).then(result => {
        console.log(result)
        let find = result[0]
        if (find) {

            // 存在，匹配成功
            // 1.生成token
            let token = jwt.sign(find.toJSON(), tokenConfig.key, tokenConfig.options)
            // 2.返回请求W
            res.status(200).send({
                state: "success",
                data: token
            })


        } else {
            res.status(403).send()
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })

})







module.exports = loginRouter