'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        io.sockets.emit('receiveMessageEvent',data)
    });
};
