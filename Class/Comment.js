const BaseClass = require("./BaseClass")

/**
 * 评论类
 */

class Comment extends BaseClass {
    constructor(id, article, userId, content, replys, createTime) {
        super(id);
        this.article = article;
        this.user = userId;
        this.content = content;
        this.replys = replys;
        this.createTime = createTime;
    }

    getArticle() {
        return this.article;
    }
    setArticle(article) {
        this.article = article;
    }

    getUser() {
        return this.user;
    }
    setUser(userId) {
        this.user = userId
    }

    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }

    getReplys() {
        return this.replys;
    }
    setReplys(replys) {
        this.replys = replys
    }

    getCreateTime() {
        return this.createTime;
    }
    setCreateTime(createTime) {
        this.createTime = createTime;
    }
}


module.exports = Comment;