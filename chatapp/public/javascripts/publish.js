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
        //const audio = new Audio("../audio/toukou.wav");
        //audio.play();
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
    if (newName.value.trim() !== '' && newName.value !== currentName.innerHTML){
        socket.emit('renameMessageEvent', {currentName: currentName.innerHTML, newName: newName.value });
        currentName.innerHTML = newName.value
    }
    else{
        //空白の時にnewNameを元の名前に戻す
        newName.value = currentName.innerHTML
    }
    renameSubmit.style.display ="none";
    newName.style.display ="none";
}

socket.on('renameReceiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});



$('#sort-select').change(function () {
    const value = $("option:selected",this).val();
    const array = Array.from($('#thread').children())
    const first = $(array[0]).attr("id")
    const last = $(array[array.length - 1]).attr("id")
    console.log(first,last,value,array);
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

//昇順降順ボタンの挙動
function up_down(){
    const updown = document.getElementById("sort-select");
    if(updown.value==="up"){
        updown.value = "down";
    }else if(updown.value==="down"){
        updown.value = "up";
    }
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    const sortValue = $("option:selected",'#sort-select').val()
    const array = Array.from($('#thread').children())
    const myName = $('#userName').val();
    //通知音
    const audio = new Audio("../audio/pipi.wav");
    audio.play();
    //デフォルトメッセージ(チャットを表示します)の削除
    if($('#thread .defo').length!=0){
        $('#thread .defo').remove();
    }
    const paper = data.userName + 'さん：' + data.message + `<font size = "1">` + " " + data.now + '</font>'
        if (array.length && sortValue === "down") {
        const index = id_number(parseInt($(array[0]).attr("id"))) + 1
        if (data.userName === myName) {
            $('#thread').prepend(`<p id=${index} class="mycomment">` + paper + '</p>');
        } else {
            $('#thread').prepend(`<p id=${index} class="yourcomment">` + paper + '</p>');
        }
    } else if (array.length && sortValue === "up") {
        const index = id_number(parseInt($(array[array.length - 1]).attr("id"))) + 1
        if (data.userName === myName) {
            $('#thread').append(`<p id=${index} class="mycomment">` + paper + '</p>');
        } else {
            $('#thread').append(`<p id=${index} class="yourcomment">` + paper + '</p>');
        }
    } else {
        if (data.userName === myName) {
            $('#thread').prepend('<p id=1 class="mycomment">' + paper + '</p>');
        } else {
            $('#thread').prepend('<p id=1 class="yourcomment">' + paper + '</p>');
        }
    }
    // 投稿した後に投稿文を空にする
    $('#message').val('');
});

// スレッドの変更
var tmp_room = undefined;
$("#sendButton").click(function(e) {
    var selectRoom = $("#rooms").val();
    const myName = $('#userName').val();
    if(selectRoom !== tmp_room) {
        $("#thread").empty();
        //デフォルトメッセージ(チャットを表示します)の表示
        $("#thread").prepend('<p class="defo">チャットを表示します</p>')
        socket.emit("leave",{value:tmp_room});
        socket.emit("join", {value : selectRoom, name : myName});
        roomchange(selectRoom);
       tmp_room = selectRoom;    
    }
    e.preventDefault();
});

function roomchange(data){
    if(data === "room01") $("#roomstat").text("現在部屋01です");
    else if(data === "room02") $("#roomstat").text("現在部屋02です");
    else $("#roomstat").text("現在入室していません");
}

function id_number(x){
    if(isNaN(x)) return  0;
    return x;
}