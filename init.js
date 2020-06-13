let User = require("./Class/User");
let userDao = require("./DAO/userDao");
const MessageBoard = require("./Class/MessageBoard")
const messageBoardDao = require("./DAO/messageBoardDao")

function init() {
    let root = new User();

    root.setUserName('root');
    root.setPassword('123456');
    root.setEmail('283385508@qq.com')
    root.setRole(10);
    root.setState(true)

    let udao = new userDao();
    udao.save(root).then(result => {
        if (result) {
            console.log(result, "root user has been initialized")
        }

    }).catch(err => {
        if (err.code == 11000) {
            console.log("root already in the system")
            return
        }
        throw err
    })

    let msboard = new MessageBoard()
    msboard.setBoardId(0)
    msboard.setTitle("留言板")

    let mdao = new messageBoardDao()
    mdao.save(msboard).then(result => {
        if (result) {
            console.log(result, "留言板  has been initialized")
        }
    }).catch(err => {
        if (err.code == 11000) {
            console.log("留言板 already in the system")
            return
        }
        throw err
    })

}


module.exports = init;