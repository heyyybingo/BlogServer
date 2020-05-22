const BaseClass = require("./BaseClass")
/**
 * 文章类
 */

class article extends BaseClass {

    constructor(id, title, content, authorId, createTime, lastUpdateTime, hidden, favs, enters, tags) {
        super(id);
        this.title = title;
        this.simpleContent = content
        this.content = content;
        this.authorId = authorId;
        this.createTime = createTime;
        this.lastUpdateTime = lastUpdateTime;
        this.hidden = hidden;
        this.favs = favs;
        this.enters = enters;
        this.tags = tags;
    }

    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title
    }
    getSimpleContent() {
        return this.simpleContent;
    }
    setSimpleContent(simpleContent) {
        this.simpleContent = simpleContent
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content
        // 设置简易内容
        // 1.找到最后一个有>标记的
        // 2.正则取出富文本标签
        let simpleContent = content.slice(0, 100);
        // simpleContent = simpleContent.replace(/<[^>]+>/g, "");
        if (simpleContent == "") {
            simpleContent = "....";
        }
        this.setSimpleContent(simpleContent)
    }

    getAuthorId() {
        return this.authorId;
    }
    setAuthorId(authorId) {
        this.authorId = authorId
    }

    getCreateTime() {
        return this.createTime;
    }
    setCreateTime(createTime) {
        this.createTime = createTime
    }

    getLastUpdateTime() {
        return this.lastUpdateTime;
    }
    setLastUpdateTime(lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime
    }

    getHidden() {
        return this.hidden;
    }
    setHidden(hidden) {
        this.hidden = this.hidden;
    }

    getFavs() {
        return this.favs;
    }
    setFavs(favs) {
        this.favs = parseInt(favs);
    }

    getEnters() {
        return this.enters;
    }
    setEnters(enters) {
        this.enters = parseInt(enters);
    }

    getTags() {
        return this.tags;
    }
    setTags(tags) {
        this.tags = tags
    }

}

module.exports = article;