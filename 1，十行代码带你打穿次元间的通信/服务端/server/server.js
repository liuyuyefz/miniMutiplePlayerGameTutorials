//引入websocket模块
var ws = require("nodejs-websocket");
//启动websocket服务器
var server = ws.createServer(function (connect) {
    connect.on('text', function (result) {
        console.log('接收消息', result)
        connect.sendText('欢迎光临')
    })
    connect.on('close', function (code) {
        console.log('关闭连接', code)
    })
    connect.on('error', function (code) {
        console.log('异常关闭', code)
    })
//设置端口号为3000
}).listen(3000)
console.log('websocket服务端启动') 