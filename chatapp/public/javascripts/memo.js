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
        //メモの内容を表示(投稿，削除ボタン付き)
        var memoId = Math.random().toString(36).slice(-8);
        var memoMessage = '<div id="input_plural">\
            <input type="text" class="form-control" id="memo' + memoId + '" value="'+ message +'">\
            <input type="button" value="投稿" id="memo' + memoId + '" class="add pluralBtn">\
            <input type="button" value="削除" class="del pluralBtn">\
        </div>'
        $('#memo-thread').prepend('<p>' + memoMessage + '</p>');
    }

    return false;
}


// 参考サイト：https://webcrehoo.com/56
//下書きしたメモを送信する関数
function memoPublish(memoId) {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#' + memoId).val();
    // 投稿内容を送信
    if (message.trim() !== '') {
        socket.emit('sendMessageEvent', { message, userName });
    }
    return false;
}
//下書き(メモ)の投稿ボタンを押した際の挙動
$(document).on("click", ".add", function() {
    memoPublish($(this).attr("id"));
    $(this).parent().remove();
});
//削除ボタンを押したときの挙動
$(document).on("click", ".del", function() {
    var target = $(this).parent();
    target.remove();
});