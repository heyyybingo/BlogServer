class Mail {
    constructor(from = 'heyyybingo@163.com', to = '283385508@qq.com', subject = "Blog Confirm", html = "<h1>验证码</h1>") {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    getFrom() {
        return this.from;
    }
    setFrom(from) {
        this.from = from;
    }

    getTo() {
        return this.to;
    }
    setTo(to) {
        this.to = to;
    }

    getSubject() {
        return this.subject;
    }
    setSubject(subject) {
        this.subject = subject;
    }

    getHtml() {
        return this.html;
    }
    setHtml(html) {
        this.html = html;
    }
}


module.exports = Mail;