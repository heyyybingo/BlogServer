let Managaer = require("./Class/Manager");
let ManagaerDao = require("./DAO/managerDao");

function init() {
    let root = new Managaer();

    root.setUserName('root');
    root.setPassword('123456');
    root.setAuthority(0)

    let mdao = new ManagaerDao();
    mdao.findByName(root).then(result => {
        console.log(result, "root is in the system")
        if (result.length <= 0) {
            return mdao.save(root)
        }
    }).then(result => {
        if (result) {
            console.log(result, "root user has been initialized")
        }

    }).catch(err => {
        throw err
    })

}


module.exports = init;