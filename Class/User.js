const BaseClass = require("./BaseClass")


class User extends BaseClass {
    constructor(id, userName, password, github, email, registerTime) {
        super(id);
        this.userName = userName;
        this.password = password;
        this.github = github;
        this.email = email;
        this.registerTime = registerTime;
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
        this.password = password
    }
    getGithub() {
        return this.github;
    }
    setGithub(github) {
        this.github = github;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getRegisterTime() {
        return this.registerTime;
    }
    setRegisterTime(registerTime) {
        this.registerTime = registerTime;
    }
}


module.exports = User