'use strict';
require("date-utils");

module.exports = function (socket, io) {
    // 部屋への参加
    var room = "";
    var name = "";
    socket.on("join",function(data){
        room = data.value;
        name = data.name;
        socket.join(room);   
        console.log(data.value,data.name)     
    });

    //部屋からの退出
    socket.on('leave', function(data) {
        socket.leave(data.value);
        console.log(data.value);
    });

    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        var now = new Date();
        data.now = now.toFormat('H:MI');
        console.log(data);
        io.to(room).emit('receiveMessageEvent',data);
    });
    socket.on('renameMessageEvent', function (data) {
        // console.log(data);
        io.sockets.emit('renameReceiveMessageEvent','"' + data.currentName + '"さんが"' + data.newName + '"という名前に変更しました。');
    });
    
};
