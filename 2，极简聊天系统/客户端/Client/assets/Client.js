
cc.Class({
    extends: cc.Component,

    properties: {
        messageLabel:cc.Label
    },
    start () {
        let Self = this;
        this.message = '';
        this.clientName = '';
        this.bRegistered = false;

        this.ws = new WebSocket("ws://127.0.0.1:3000");
        this.ws.onopen = function (event) {
            console.log("连接服务端");
        };

        this.ws.onmessage = function (event) {
            console.log("接收服务端信息: " + event.data);

            let json=JSON.parse(event.data);//json字符串转对象
            let name =  json.name;
            let message =  json.message;
            //拼接最终显示字符串
            let str = name+'发来：'+message;
            //给label赋值
            Self.messageLabel.string = str;
        };

        this.ws.onerror = function (event) {
            console.log("异常关闭");
        };
        
        this.ws.onclose = function (event) {
            console.log("断开连接");
        };

    },
    onTextChanged: function(text, editbox, customEventData) {

        console.log("文本变化",text);
        if(!this.bRegistered)
        {
            this.clientName = text;
        }
        else
        {
            this.message = text;
        }   
    },
    register(event, customEventData){
        //组装消息
        let data = {};
        data.name = this.clientName;
        data.message = 'login';
        //转化为字符串发送
        let jsonStr=JSON.stringify(data);
        //发送
        this.ws.send(jsonStr);

        this.bRegistered = true;
        let button = event.target;
        button.destroy(); 
    },
    sendMessage(event, customEventData){

        let data = {};
        data.name = this.clientName;
        data.message = this.message;

        let jsonStr=JSON.stringify(data);

        this.ws.send(jsonStr);
    }
});
