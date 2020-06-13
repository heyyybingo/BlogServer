const BaseClass = require("./BaseClass")

/**
 * 回复类
 */

class Reply extends BaseClass {
    constructor(id, commentId, from, to, content, createTime) {
        super(id);
        // this.commentId = commentId;
        this.from = from;
        this.to = to;
        this.content = content;
        this.createTime = createTime;
    }

    // getCommentId() {
    //     return this.commentId;
    // }
    // setCommentId(commentId) {
    //     this.commentId = commentId;
    // }

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

    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }

    getCreateTime() {
        return this.createTime;
    }
    setCreateTIme(createTime) {
        this.createTime = createTime;
    }
}


module.exports = Reply;