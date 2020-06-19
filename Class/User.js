const BaseClass = require("./BaseClass")


class User extends BaseClass {
    constructor(id, userName, password, role, state, email, registerTime,avatar) {
        super(id);
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.state = state;
        this.email = email;
        this.registerTime = registerTime;
        this.avatar=avatar;
    }
    getAvatar(){
        return this.avatar;
    }
    setAvatar(avatar){
        this.avatar=avatar;
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
    // getGithub() {
    //     return this.github;
    // }
    // setGithub(github) {
    //     this.github = github;
    // }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }

    getState() {
        return this.state
    }
    setState(state) {
        this.state = state;
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