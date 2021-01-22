// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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

    // update (dt) {},
});
