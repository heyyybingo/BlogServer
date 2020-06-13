const BaseClass = require("./BaseClass")


class MessageBoard extends BaseClass {
    constructor(_id, boardId, title, comments) {
        super(_id)
        this.boardId = boardId;
        this.title = title
        this.comments = comments
    }

    getBoardId() {
        return this.boardId;
    }
    setBoardId(boardId) {
        this.boardId = boardId;
    }
    getTitle() {
        return this.title
    }
    setTitle(title) {
        this.title = title
    }
    getComments() {
        return this.comments;
    }
    setComment(comments) {
        this.comments = comments
    }
}

module.exports = MessageBoard