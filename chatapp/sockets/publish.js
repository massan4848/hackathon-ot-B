'use strict';
require("date-utils");

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        var now = new Date();
        data.now = now.toFormat('H:MI');
        console.log(data);
        io.sockets.emit('receiveMessageEvent',data);
    });
    socket.on('renameMessageEvent', function (data) {
        // console.log(data);
        io.sockets.emit('renameReceiveMessageEvent','"' + data.currentName + '"さんが"' + data.newName + '"という名前に変更しました。');
    });
    
};
