'use strict';

var i = 0;
// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // メモの内容を表示
    if(message==""){
        //alert("メッセージがありません．");
    }else{
        //メモの内容を表示(投稿，削除ボタン付き)
        const memoId = "memo"+i;
        const postId = "post"+i;
        i++;
        var memoMessage = '<div id="input_plural" class="padding">\
            <input type="text" class="form-control" id="memo' + memoId + '" value="'+ message +'">\
            <input type="image" src="../img/send.jpg" id="memo' + postId + '" class="add pluralBtn common-button room-publish_button">\
            <input type="image" src="../img/delete.jpg" class="del pluralBtn common-button room-memo_button">\
        </div>'
        $('#memo-thread').prepend('<p>' + memoMessage + '</p>');
        // 投稿した後に投稿文を空にする
        $('#message').val('');
    }

    return false;
}

// 参考サイト：https://webcrehoo.com/56
//下書き(メモ)の投稿ボタンを押した際の挙動
$(document).on("click", ".add", function() {
    const postId = $(this).attr("id");
    const memoId = postId.replace("post", "memo");
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#' + memoId).val();
    // 投稿内容を送信
    if (message.trim() !== '') {
        socket.emit('sendMessageEvent', { message, userName });
        const audio = new Audio("../audio/toukou.wav");
        audio.play();
    }
    $(this).parent().remove();
});
//削除ボタンを押したときの挙動
$(document).on("click", ".del", function() {
    var target = $(this).parent();
    target.remove();
});