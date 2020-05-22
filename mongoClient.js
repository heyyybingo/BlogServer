let mongoose = require('mongoose')
let DBconfig = require("./DBconfig")



let mongoClient = mongoose.createConnection(DBconfig.DBuri, DBconfig.options)

/*
 * Mongo 连接成功回调
 */
mongoClient.on('connected', function () {
   console.log('Mongoose connected to ' + DBconfig.DBuri);
});
/**
 * Mongo 连接失败回调
 */
mongoClient.on('error', function (err) {
   console.log('Mongoose connection error: ' + err);
});
/**
 * Mongo 关闭连接回调
 */
mongoClient.on('disconnected', function () {
   console.log('Mongoose disconnected');
});


module.exports = mongoClient