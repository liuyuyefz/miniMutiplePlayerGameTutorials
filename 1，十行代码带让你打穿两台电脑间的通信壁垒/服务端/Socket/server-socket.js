//用户信息
let guest_info = function () {
    this.connect = null;
    this.name = '';
}
//所有用户，必须用全局global安装，这样保证每一个线程都能访问到相同的全局数组
global.guest_arr = [];


var ws = require("nodejs-websocket");
// 创建服务器
var server = ws.createServer(function (connect) 
{
    // 监听客户端回调信息
    connect.on("text", function (data) {

        let data_json = JSON.parse(data);

        //用户登录
        if (data_json.type === 'login') {
            let bUserExist = false;

            for (let i = 0; i < global.guest_arr.length; i++) {
                let guest = global.guest_arr[i];
                if (guest.name === data_json.name) {
                    bUserExist = true;
                    global.guest_arr[i].connect = connect;
                }
            }
            //如果新用户就注册
            if (!bUserExist) {
                let guest = new guest_info();
                guest.connect = connect;
                guest.name = data_json.name;
                global.guest_arr.push(guest);
            }
            console.log(data_json.name+'进入聊天室')
        }
        //只需要服务器接收消息不需要发送给其他用户
        else if (data_json.type === 'server') {

        }
        //发送消息给指定名字的用户
        else if (data_json.type === 'user') {
            console.log('收到'+data_json.name+'的消息')

            let guest = null;
            // 判断用户是否存在
            for (let i = 0; i < global.guest_arr.length; i++) {
                let name = global.guest_arr[i].name;
                if (name === data_json.user_name) {
                    guest = global.guest_arr[i];
                    console.log('存在用户')
                }
            }
            // 用户存在发送消息
            if (guest) {
                guest.connect.sendText('{"name":"'+ data_json.name +'","message":"'+data_json.message+'"}');
                console.log(data_json.name+'发送信息给'+guest.name)
                console.log(data_json.message)
            }

        }
        //发送消息给所有用户
        else if (data_json.type === 'all') {

            for (let i = 0; i < global.guest_arr.length; i++) {
                let guest = global.guest_arr[i];
                guest.connect.sendText('{"name":"'+ data_json.name +'","message":"'+data_json.message+'"}');
            }

        }
    })
    connect.on("close", function (code, reason) {
        // console.log(code.name+'退出聊天室')
        console.log("关闭连接")
    });
    connect.on("error", function (code, reason) {
        // console.log(code.name+'异常退出聊天室')
        console.log("异常关闭")
    });
}).listen(3000)
console.log("WebSocket建立完毕")

