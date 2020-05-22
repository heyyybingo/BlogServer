let config = {
    url: "127.0.1",
    port: "27017",
    database: "myblog"
}
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let DBuri = "mongodb://" + config.url + ":" + config.port + "/" + config.database


module.exports = {
    DBuri,
    options
}