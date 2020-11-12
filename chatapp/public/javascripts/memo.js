'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // メモの内容を表示
    if(message==""){
        alert("メッセージがありません．");
    }else{
        $('#thread').prepend('<p>' + message + '</p>');
    }

    return false;
}
