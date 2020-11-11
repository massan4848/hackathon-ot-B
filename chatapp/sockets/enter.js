'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('connection', function (data) {
        socket.broadcast.emit('enterOtherEvent', data + 'が入室しました。');
    });
};
