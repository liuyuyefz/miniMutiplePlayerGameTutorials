
cc.Class({
    extends: cc.Component,

    properties: {
       messageLabel:cc.Label,
       registerButton:cc.Node,
       sendButton:cc.Node,

       clientName:'',
       message:''
    },
    start () {
        let Self = this;

        this.ws = new WebSocket("ws://127.0.0.1:3000");
        this.ws.onopen = function (event) {
            console.log("连接服务端");
        };

        this.ws.onmessage = function (event) {
            console.log("接收服务端信息: " + event.data);

            let jsonObj = JSON.parse(event.data);
            let name = jsonObj.name;
            let message = jsonObj.message;
            Self.messageLabel.string = name+'发来消息：'+message;
        };

        this.ws.onerror = function (event) {
            console.log("异常关闭");
        };
        
        this.ws.onclose = function (event) {
            console.log("断开连接");
        };
    },
    onTextChanged: function(text, editbox, customEventData) {

        if(this.registerButton.active == true)
        {
            this.clientName = text;
        }

        this.message = text; 
    },
    register(){

        let data = {};
        data.name = this.clientName;
        data.message = 'login';

        let jsonStr=JSON.stringify(data);

        this.ws.send(jsonStr);

        this.registerButton.active = false;
        this.sendButton.active = true;
    },
    sendMessage(){

        let data = {};
        data.name = this.clientName;
        data.message = this.message;

        let jsonStr=JSON.stringify(data);

        this.ws.send(jsonStr);
    }
});
