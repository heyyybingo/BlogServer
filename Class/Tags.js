const BaseClass = require("./BaseClass")

class Tags extends BaseClass {
    constructor(id, tagName, hot) {
        super(id);
        this.tagName = tagName;
        this.hot = hot
    }

    getTagName() {
        return this.tagName;
    }
    setTagName(tagName) {
        this.tagName = tagName
    }

    getHot() {
        return this.hot;
    }
    setHot(hot) {
        this.hot = hot;
    }
}


module.exports = Tags