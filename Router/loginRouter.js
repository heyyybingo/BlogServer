var loginRouter = require("express").Router()
var Manager = require("../Class/Manager")
var managerDao = require("../DAO/managerDao")

var User = require("../Class/User");
var userDao = require("../DAO/userDao");
// token验证
const jwt = require('jsonwebtoken');
const tokenConfig = require("../tokenConfig");

var Mail = require("../Class/Mail")
const nodemailer = require('nodemailer');
const transOption = require("../transConfig")
const transporter = new nodemailer.createTransport(transOption);
loginRouter.post("/account/managerLogin", (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    // let manager = new Manager();

    let user = new User();
    user.setUserName(userName);
    user.setPassword(password);
    console.log(user)
    let udao = new userDao();
    udao.findManagerByNameAndPassword(user).then(result => {
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
    // manager.setUserName(userName);
    // manager.setPassword(password)
    // console.log(manager)
    // let mdao = new managerDao();

    // mdao.findByNameAndPassword(manager).then(result => {
    //     console.log(result)
    //     let find = result[0]
    //     console.log(find)
    //     if (find) {

    //         // 存在，匹配成功
    //         // 1.生成token
    //         let token = jwt.sign(find.toJSON(), tokenConfig.key, tokenConfig.options)
    //         // 2.返回请求W
    //         res.status(200).send({
    //             state: "success",
    //             data: token
    //         })


    //     } else {
    //         res.status(403).send()
    //     }
    // }).catch(err => {
    //     console.log(err)
    //     res.status(500).send()
    // })


})
loginRouter.post("/logout", (req, res) => {
    // res.status(200).send({
    //     state: "success",
    //     data: req.User
    // })
})
loginRouter.post("/testLogin", (req, res) => {
    res.status(200).send({
        state: "success",
        data: req.User
    })
})
loginRouter.post("/account/managerReg", (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    let authority = req.body.authority
    let user = new Manager();
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
    // let github = req.body.github;
    let email = req.body.email;
    let checkCode = req.body.checkCode
    let user = new User();
    console.log("session:%", req.session)
    console.log("checkCode:%", req.session.checkCode)
    if (checkCode != req.session.checkCode) {
        res.status(403).send({
            result: "wrong code"
        })
        return;
    }
    user.setUserName(userName);
    user.setPassword(password);
    // user.setGithub(github);
    user.setEmail(email);
    user.setState(true);
    user.setRole(0);

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
            return
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
    udao.findUserByNameAndPassword(user).then(result => {
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

loginRouter.post("/account/checkMail", (req, res) => {
    let email = req.body.email;
    let code = Math.floor((Math.random() * 9000) + 1000);
    let mail = new Mail();
    mail.setTo(email);

    let html = '<h1>你好，这是你的验证码！<h1><p>' + code + '</p>'
    mail.setHtml(html)
    console.log(mail)
    transporter.sendMail(mail, (err, Info) => {
        if (err) {
            console.log(err)
            res.status(403).send()
            return;
        }
        console.log("message sent:%", Info.messageId)
        req.session.checkCode = code;
        console.log("session:%", req.session)
        console.log("sendCheckcode:%", req.session.checkCode)
        res.status(200).send({
            result: 'success',
            id: Info.messageId
        })
    })

})






module.exports = loginRouter