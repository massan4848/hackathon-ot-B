'use strict';
require("date-utils");

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    var room = "";
    var name = "";
    io.sockets.on("join",function(data){
        room = data.value;
        socket.join(room);        
    })

    socket.on('sendMessageEvent', function (data) {
        var now = new Date();
        data.now = now.toFormat('H:MI');
        console.log(data);
        io.to(room).emit('receiveMessageEvent',data);
    });
};
