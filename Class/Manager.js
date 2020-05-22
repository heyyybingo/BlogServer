const BaseClass = require("./BaseClass")

class Manager extends BaseClass {
    constructor(id, userName, password, authority) {
        super(id)
        this.userName = userName;
        this.password = password;
        this.authority = authority;
    }

    getUserName() {
        return this.userName;
    }
    setUserName(userName) {
        this.userName = userName;
    }

    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }

    getAuthority() {
        return this.authority;
    }
    setAuthority(authority) {
        this.authority = authority
    }
}

module.exports = Manager