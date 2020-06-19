const express = require('express');
const app = express();
const port = 3002;
let mongoClient = require('./mongoClient')
// token验证
const jwt = require('jsonwebtoken');
const tokenConfig = require("./tokenConfig");

const loginRouter = require("./Router/loginRouter")
const articleRouter = require("./Router/articleRouter");
const managerRouter = require("./Router/managerRouter");
const tagsRouter = require("./Router/tagsRouter")
const comRepRouter = require("./Router/comRepRouter")
const userRouter = require("./Router/userRouter")
const uploadRouter = require("./Router/uploadRouter")
const messageBoardRouter = require("./Router/messageBoardRouter")
const bodyParser = require('body-parser')
const session = require('express-session')

const init = require("./init")
// app.use("*", function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Credentials', 'true')
//     if (req.method === 'OPTIONS') {
//         res.send(200)
//     } else {
//         next()
//     }
// });

app.use(bodyParser.json()); // 添加json解析
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'heyyybingo',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 12,
        httpOnly: true
    }
}))
//非登录需要进行token验证
app.post(/^(?!\/account)/, function (req, res, next) {
    // console.log(req)
    try {
        if (!req.headers['authorization']) {
            throw "error"
        }
        let authorization = req.headers['authorization'].split(" ");

        if (authorization[0] != "Bearer") {
            throw "error"
        }

        let token = authorization[1];
        jwt.verify(token, tokenConfig.key, function (err, decoded) {
            if (err) {
                // 发生错误则返回状态马401，表示这个请求需要用户验证

                throw err;
            }
            // 如果token验证正确，则继续
            console.log(decoded)
            // 添加使用者
            req.User = decoded
            next()
        });
    } catch (err) {
        // 有可能没有auth头
        console.log(err);
        res.status(401).send();
        return;
    }


})
app.use("/public",express.static('public'));
app.use("/", loginRouter)
app.use("/article", articleRouter)
app.use("/manager", managerRouter)
app.use("/tags", tagsRouter)
app.use("/comRep", comRepRouter)
app.use("/user", userRouter)
app.use("/upload", uploadRouter)
app.use("/messageBoard", messageBoardRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);

    init();
})