var ws = require("nodejs-websocket");


let client1 = null;
let client2 = null;

var server = ws.createServer(function (connect) 
{
    connect.on("text", function (data) {
        console.log('收到消息=',data)

        let json=JSON.parse(data);

        let name =  json.name;
        let message =  json.message;

        //注册
        if(message == 'login')
        {
            if(name == 'client1'){
                client1 = connect;
                console.log('client1注册成功！')
            }
            else  if(name == 'client2'){
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
    connect.on("close", function (code, reason) {});
    connect.on("error", function (code, reason) {});
}).listen(3000)
console.log('websocket服务端启动')