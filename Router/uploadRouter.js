var uploadRouter = require("express").Router()
var multiparty = require('multiparty');
var fs = require("fs");
// 上传图片，返回图片保存的url，(fieid name 为 image,且只处理1个文件)
uploadRouter.post("/uploadImage", (req, res) => {
    let uploadDir = "./public/image"
    let maxFilesSize = 10 * 1024 * 1024
    let form = new multiparty.Form({
        maxFilesSize,
        uploadDir
    });

    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        if (err) {
            console.log(err)
            res.status(500).send()
            return;
        }
        if (!files.image) {
            // 
            try {
                for (let key in files) {
                    for (let file of files[key]) {
                        console.log(file)
                        fs.unlinkSync(file.path)
                    }
                }
            } catch (err) {
                res.status(500).send();
                return;
            }
            res.status(403).send();
            return;
        }
        console.log(files.image)
        let imageUrl = files.image[0].path;
        res.status(200).send({
            state: "success",
            data: imageUrl
        });



    })



})


module.exports = uploadRouter;