/**基本dao层类
 * Basedao
 * 
 * 通用创建函数，支持obj，array[obj]
 * create(obj) 
 * 
 * 通用保存函数
 * save(obj)
 * 
 * 通用查询函数
 * find(obj)    
 * findById(obj)    通过id查找
 * 
 * 
 * 通用更新函数
 * findByIdAndUpdate(obj)
 * 
 * 
 * 通用删除函数
 * 
 * findByIdAndRemove(obj)
 */


class BaseDao {
    constructor(model) {
        this.model = model;
    }
    create(obj) {
        return this.model.create(obj)
    }
    save(obj) {
        let entity = new this.model(obj)
        return entity.save()
    }
    find() {
        return this.model.find()
    }
    findById(obj) {
        return this.model.findById(obj.getId())
    }

    findByIdAndUpdate(obj) {
        // 由于更新时不会对undefined的值采用默认值，会变成空值，这里希望更新的只有我们设置的值
        for (let key in obj) {
            if (obj[key] == undefined) {
                delete obj[key]
            }
        }
        console.log(obj)
        return this.model.findByIdAndUpdate(obj.getId(), {
            $set: obj,

        }, {
            'new': true
        })
    }
    findByIdAndRemove(obj) {
        return this.model.findByIdAndRemove(obj.getId())
    }

}


module.exports = BaseDao