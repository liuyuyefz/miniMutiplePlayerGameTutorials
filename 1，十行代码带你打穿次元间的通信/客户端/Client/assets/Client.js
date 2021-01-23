
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    start () {
        let ws = new WebSocket("ws://127.0.0.1:3000");
        ws.onopen = function (event) {
            console.log("连接服务端");
            ws.send('客户端1发来消息');
        };
        ws.onmessage = function (event) {
            console.log("接收服务端信息: " + event.data);
        };
        ws.onerror = function (event) {
            console.log("异常关闭");
        };
        ws.onclose = function (event) {
            console.log("断开连接");
        };
    },
});
