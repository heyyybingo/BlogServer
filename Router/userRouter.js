var userRouter = require("express").Router()
const userDao = require("../DAO/userDao")
const User = require("../Class/User")
const jwt = require('jsonwebtoken');
const tokenConfig = require("../tokenConfig");
const fs = require("fs")
userRouter.post("/userInfo", (req, res) => {
    res.status(200).send({
        state: "success",
        data: req.User
    })
})
// userRouter.get("/getAuthor", (req, res) => {
//     let authorId = req.query.authorId;
//     console.log(authorId)
//     let user = new User();
//     user.setId(authorId);

//     let udao = new userDao();

//     udao.findById(user).then(result => {
//         console.log(result);
//         if (!result) {
//             throw "notFound"
//         }
//         res.status(200).send({
//             state: "success",
//             data: result.userName
//         })
//     }).catch(err => {
//         console.log(err)
//         if (err == "notFound") {
//             res.status(404).send();
//             return;
//         }
//         res.status(500).send();
//     })
// })

userRouter.post('/findUser', (req, res) => {

    let page = req.body.page;
    let everyNum = req.body.everyNum

    let userName = req.body.userName;
    let email = req.body.email;

    let user = new User();
    user.setUserName(userName);

    user.setEmail(email)
    let udao = new userDao();
    console.log(user)
    udao.findUser(page, everyNum, user).then(result => {
        console.log(result, typeof (result))


        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err);

        res.status(500).send()
    })


})

userRouter.post('/findManager', (req, res) => {

    let page = req.body.page;
    let everyNum = req.body.everyNum
    let role = req.body.role
    let userName = req.body.userName;
    let email = req.body.email;

    let user = new User();
    user.setUserName(userName);

    user.setEmail(email)
    console.log(user)
    let udao = new userDao();

    udao.findManager(role, page, everyNum, user).then(result => {
        console.log(result)

        res.status(200).send({
            state: "success",
            data: result
        })
    }).catch(err => {
        console.log(err);

        res.status(500).send()
    })


})



userRouter.post('/addUser', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;


    let user = new User();
    user.setUserName(userName);
    user.setPassword(password);
    user.setEmail(email);
    user.setRole(0);

    let udao = new userDao();
    udao.save(user).then(result => {
        console.log(result)
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err.code == 11000) {
            console.log("userName dup");
            res.status(403).send({
                result: "Duplicate"
            })
        }
    })
})


userRouter.post('/addManager', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let role = req.body.role;

    let user = new User();
    user.setUserName(userName);
    user.setPassword(password);
    user.setEmail(email);
    user.setRole(role);
    console.log(user)
    let udao = new userDao();
    udao.save(user).then(result => {
        console.log(result)
        res.status(200).send({
            state: "success"
        })
    }).catch(err => {
        console.log(err)
        if (err.code == 11000) {
            console.log("userName dup");
            res.status(403).send({
                result: "Duplicate"
            })
            return;
        }
        res.status(500).send()
    })
})


userRouter.post('/updateUser', (req, res) => {
    let _id = req.body._id
    let oldavatar = req.body.oldavatar;
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let role = req.body.role;
    let state = req.body.state;

    let avatar = req.body.avatar;

    let user = new User();
    user.setId(_id)
    user.setUserName(userName);
    user.setPassword(password);
    user.setEmail(email);
    user.setRole(role);
    user.setState(state);
    user.setAvatar(avatar);
    console.log("updateUser-user:", user)
    let udao = new userDao();
    udao.findByIdAndUpdate(user).then(result => {
        console.log("updateUser-result:", result);
        if (result) {
            console.log("OLDAVATAR", oldavatar)
            if (oldavatar) {
                try {
                    fs.unlinkSync(oldavatar);
                } catch (err) {
                    console.log(err)
                }
            }
            let token = jwt.sign(result.toJSON(), tokenConfig.key, tokenConfig.options)
            // console.log("refreshedToken", token)
            res.status(200).send({
                state: "success",
                data: token
            })
        } else {
            throw 1;
        }
    }).catch(err => {
        console.log(err)
        if (err.code == 11000) {
            console.log("userName dup");
            res.status(403).send({
                result: "Duplicate"

            })
            return;
        }

        if (err == 1) {
            res.status(404).send();
            return;
        }
        res.status(500).send();
    })

})

userRouter.post('/removeUser', (req, res) => {
    let _id = req.body._id;

    let user = new User();
    user.setId(_id);
    console.log(user)
    let udao = new userDao();
    udao.findByIdAndRemove(user).then(result => {
        if (result) {
            let avatar = result.avatar;
            if (avatar) {
                try {
                    fs.unlinkSync(avatar);
                } catch (err) {
                    console.log(err)
                }
            }
            res.status(200).send({
                state: "success"
            })
        } else {
            throw 1;
        }
    }).catch(err => {
        console.log(err)
        if (err.code == 11000) {
            console.log("userName dup");
            res.status(403).send({
                result: "Duplicate"
            })
            return;
        }

        if (err == 1) {
            res.status(404).send();
            return;
        }
        res.status(500).send()
    })

})

module.exports = userRouter