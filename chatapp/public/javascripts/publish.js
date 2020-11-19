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
        //投稿音
        const audio = new Audio("../audio/toukou.wav");
        audio.play();
    }
    return false;
}

//名前変更機能
//新しい名前の取得
const newName = document.getElementById('userName');
//今の名前の取得
const currentName = document.getElementById('currentName');
const renameSubmit = document.getElementById('renameSubmit');
//隠す名前編集のフォームを隠す
renameSubmit.style.display ="none";
newName.style.display ="none";
//名前をクリックしたときにフォームを出させる
currentName.addEventListener('click',() => {
    if(renameSubmit.style.display === "none"){
        renameSubmit.style.display ="block";
        newName.style.display = "block"
    }
    else{
        renameSubmit.style.display ="none";
        newName.style.display = "none"
    }
})

//名前を変更する
function rename(){
    //空白を除外する
    if (newName.value.trim() !== ''){
        currentName.innerHTML = newName.value
    }
    else{
        //空白の時にnewNameを元の名前に戻す
        newName.value = currentName.innerHTML
    }
    renameSubmit.style.display ="none";
    newName.style.display ="none";
}


$('#sort-select').change(function () {
    const value = $("option:selected").val();
    const array = Array.from($('#thread').children())
    const first = $(array[0]).attr("id")
    const last = $(array[array.length - 1]).attr("id")

    if (value === "up" && first > last) {
        $('#thread').empty()
        $.each(array.reverse(), function (index, element) {
            $('#thread').append($(element))
        })
    } else if (value === "down" && first < last) {
        $('#thread').empty()
        $.each(array, function (index, element) {
            $('#thread').prepend($(element))
        })
    }
})

// Enterキーを押したとき投稿が送信されるようにする処理
$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        publish();
    }
});

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    const sortValue = $("option:selected").val()
    const array = Array.from($('#thread').children())
    const myName = $('#userName').val();
    //通知音
    const audio = new Audio("../audio/tuuti.wav");
    audio.play();

    if (array.length && sortValue === "down") {
        const index = parseInt($(array[0]).attr("id")) + 1
        if (data.userName === myName) {
            $('#thread').prepend(`<p id=${index} class="mycomment">` + data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>' + '</p>');
        } else {
            $('#thread').prepend(`<p id=${index} class="yourcomment">` + data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>' + '</p>');
        }
    } else if (array.length && sortValue === "up") {
        const index = parseInt($(array[array.length - 1]).attr("id")) + 1
        if (data.userName === myName) {
            $('#thread').append(`<p id=${index} class="mycomment">` + data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>' + '</p>');
        } else {
            $('#thread').append(`<p id=${index} class="yourcomment">` + data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>' + '</p>');
        }
    } else {
        if (data.userName === myName) {
            $('#thread').prepend('<p id=1 class="mycomment">' + data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>' + '</p>');
        } else {
            $('#thread').prepend('<p id=1 class="yourcomment">' + data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>' + '</p>');
        }
    }
    // 投稿した後に投稿文を空にする
    $('#message').val('');
});
