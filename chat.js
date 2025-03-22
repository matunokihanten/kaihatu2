// Firebaseの設定とインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCluZ07gfC31CH5njxq_inel53KOvV6jG8",
    authDomain: "chat-c59bf.firebaseapp.com",
    databaseURL: "https://chat-c59bf-default-rtdb.firebaseio.com",
    projectId: "chat-c59bf",
    storageBucket: "chat-c59bf.firebasestorage.app",
    messagingSenderId: "383217078378",
    appId: "1:383217078378:web:3b90e80e25f7351d6bba13",
    measurementId: "G-RY7CNVCRNG"
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// HTML要素の取得
const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const messagesList = document.getElementById("messages");

// Firebaseデータベースの参照
const messagesRef = ref(database, "messages");

// メッセージを送信
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (usernameInput.value && messageInput.value) {
        const newMessage = {
            username: usernameInput.value,
            text: messageInput.value,
            createdAt: Date.now(),
        };
        push(messagesRef, newMessage); // メッセージをデータベースに保存
        messageInput.value = ""; // 入力欄をクリア
    }
});

// メッセージをリアルタイムで受信
onValue(messagesRef, (snapshot) => {
    messagesList.innerHTML = ""; // メッセージ一覧をクリア
    snapshot.forEach((childSnapshot) => {
        const msg = childSnapshot.val();
        const li = document.createElement("li");
        li.textContent = `${msg.username}: ${msg.text}`;
        messagesList.appendChild(li);
    });
});