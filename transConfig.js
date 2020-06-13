// let mailOptions = {
//     from: '283385508@qq.com', // sender address
//     to: '283385508@qq.com', // list of receivers
//     subject: 'Hello', // Subject line
//     // 发送text或者html格式
//     // text: 'Hello 我是火星黑洞', // plain text body
//     html: '<b>Hello 我是火星黑洞</b>' // html body

// }


let transOption = {
    // host: 'smtp.ethereal.email',
    // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    host: 'smtp.163.com',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: 'heyyybingo@163.com', //你的邮箱
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'NROJQNTUIUIBWEHL',
    }

}

module.exports = transOption