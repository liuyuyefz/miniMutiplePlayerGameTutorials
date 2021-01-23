//引入websocket模块
let ws = require("nodejs-websocket");

let client1 = null;
let client2 = null;

//启动websocket服务器
let server = ws.createServer(function (connect) {

    connect.on('text', function (result) {

        let json=JSON.parse(result);

        console.log('接收消息', json)

        //注册
        if(json.message == 'login')
        {
            if(json.name == 'client1'){
                client1 = connect;
                console.log('client1注册成功！')
            }
            else  if(json.name == 'client2'){
                client2 = connect;
                console.log('client2注册成功！')
            } 

            return;
        }

        if(json.name == 'client1'){

            let data = {};
            data.name = 'client1';
            data.message = json.message;
    
            let jsonStr=JSON.stringify(data);
            client2.sendText(jsonStr);
        }
        else if(json.name == 'client2'){
            let data = {};
            data.name = 'client2';
            data.message = json.message;
    
            let jsonStr=JSON.stringify(data);
            client1.sendText(jsonStr);
        }  

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