const messagesRef = ref(db, "messages");

// 送信ボタンの動作確認
document.getElementById("send-button").addEventListener("click", () => {
  const message = document.getElementById("message-input").value;
  if (message) {
    push(messagesRef, { text: message }); // メッセージを送信
    console.log("メッセージ送信:", message); // ログに出力
  }
});

// メッセージ受信部分
onValue(messagesRef, (snapshot) => {
  console.log("メッセージリスト受信");
  snapshot.forEach((childSnapshot) => {
    console.log(childSnapshot.val());
  });
});