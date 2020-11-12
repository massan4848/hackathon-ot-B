'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').text();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    if ( message.trim() !== '' ){
        socket.emit('sendMessageEvent',{message,userName});
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    let now = new Date();
    $('#thread').prepend('<p>'+data.userName + 'さん：'+ data.message + '</p>');
    $('#thread').prepend('<p><font size = "1">'+ toFormat('H:MI') + '</p>');
    // 投稿した後に投稿文を空にする
    $('#message').val('');
});
