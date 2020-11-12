'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').text();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    if (message !== ''){
        // alert(message);
        socket.emit('sendMessageEvent',{message,userName});
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>'+data.userName + 'さん：'+ data.message + '</p>');
    // 投稿した後に投稿文を空にする
    $('#message').val('');
});
