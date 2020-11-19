'use strict';
// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    if (message.trim() !== '') {
        socket.emit('sendMessageEvent', { message, userName });
        audio = new Audio();
        audio.play();
    }
    return false;
}

//Enterキーを押したとき投稿が送信されるようにする処理
$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        publish();
    }
});

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    const myName = $('#userName').val();
    if(data.userName ===myName){
        $('#thread').prepend('<p class="mycomment">' + data.userName + 'さん：'+ data.message +'<font size = "1">'+ " " + data.now + '</font>'+'</p>');
    }else{
        $('#thread').prepend('<p class="yourcomment">' + data.userName + 'さん：'+ data.message +'<font size = "1">'+ " " + data.now + '</font>'+'</p>');
    }
    // 投稿した後に投稿文を空にする
    $('#message').val('');
});
