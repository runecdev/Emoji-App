// Variables
const url =
    "https://emoji-api.com/emojis?access_key=8c1a1c5ffa52d6836012e7a184e9e9ce13c91f6d";
const emojiName = document.querySelector(".emoji-name");
const emojiBox = document.querySelector(".emoji-box");
const getBtn = document.querySelector("#get-btn");
const copyBtn = document.querySelector("#copy-btn");
const historyWrapper = document.querySelector(".history-wrapper");
let randNum;
let emoji = localStorage.getItem("emoji");
emoji = JSON.parse(emoji) || false;
let history = [];

const storeEmoji = async () => {
    try {
        let res = await fetch(url);
        let data = await res.json();
        localStorage.setItem("emoji", JSON.stringify(data));
        emoji = localStorage.getItem("emoji");
        emoji = JSON.parse(emoji);
        getBtn.disabled = false;
        emojiName.innerText = "Now Go On! Get Emoji!";
        emojiBox.innerText = "😈";
    } catch {
        emojiName.innerText = "SOMETHING WENT WRONG! PLEASE REFRESH THE PAGE.";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (!emoji) {
        storeEmoji();
    } else {
        getBtn.disabled = false;
        emojiName.innerText = "NOW GO ON! GET EMOJI!";
        emojiBox.innerText = "😈";
        showHistory();
    }
});

getBtn.addEventListener("click", () => {
    randNum = Math.floor(Math.random() * 1859);
    if (emoji) {
        emojiBox.innerText = emoji[randNum].character;
        emojiName.innerText = emoji[randNum].unicodeName.toUpperCase();
    } else {
        emojiName.innerText = "SORRY BUT, PLEASE REFRESH THE PAGE";
        emojiBox.innerText = "😓";
    }
});
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(emojiBox.innerText);
    if (localStorage.getItem("history")) {
        let temp = localStorage.getItem("history");
        temp = JSON.parse(temp);
        let temp1 = emoji[randNum];
        history = [...temp, temp1];
        history = new Set(history);
        history = [...history];
        history = JSON.stringify(history);
        localStorage.setItem("history", history);
    } else {
        history.push(emoji[randNum]);
        history = JSON.stringify(history);
        localStorage.setItem("history", history);
    }
});

const showEmojiList = (emoji, name) => {
    let div = document.createElement("div");
    let span = document.createElement("span");
    let span1 = document.createElement("span");
    let btn = document.createElement("button");
    div.classList.add("entry-con");
    span.classList.add("copied-emoji");
    span1.classList.add("copied-name");
    span.innerText = emoji;
    span1.innerText = name;
    div.appendChild(span);
    div.appendChild(span1);
    div.appendChild(btn);
    historyWrapper.appendChild(div);
};

const showHistory = () => {
    let historyEmoji = localStorage.getItem("history");
    historyEmoji = JSON.parse(historyEmoji);
    console.log(historyEmoji);
    historyEmoji.forEach((ele) => {
      if(ele){
      showEmojiList(ele.character, ele.unicodeName)
      }
      else {
        historyEmoji.pop(ele)
      }
    })
};
