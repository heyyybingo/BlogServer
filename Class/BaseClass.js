class BaseClass {
    constructor(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
}

module.exports = BaseClass