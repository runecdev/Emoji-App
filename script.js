// Variables
const url =
    "https://emoji-api.com/emojis?access_key=8c1a1c5ffa52d6836012e7a184e9e9ce13c91f6d";
const getBtn = document.querySelector("#get-btn");
const copyBtn = document.querySelector("#copy-btn");
const emojiBox = document.querySelector(".emoji-box");
const emojiName = document.querySelector(".emoji-name");
// Get emojis from api and store it into local storage
const storeData = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const strData = JSON.stringify(data);
        localStorage.setItem("emojis", strData);
        getBtn.disabled = false;
        showEmoji();
    } catch {
        alert("Please Refresh the Page.");
    }
};

const checkEmoji = () => {
    if (localStorage.getItem("emojis")) {
        getBtn.disabled = false;
        showEmoji();
        return true;
    } else {
        storeData();
    }
};

const showEmoji = () => {
    let num = Math.floor(Math.random() * 1859);
    let emoji = localStorage.getItem("emojis");
    emoji = JSON.parse(emoji);
    emojiBox.innerText = emoji[num].character;
    emojiName.innerText = emoji[num].unicodeName.toUpperCase();
};
document.addEventListener("DOMContentLoaded", checkEmoji);
getBtn.addEventListener("click", showEmoji);
copyBtn.addEventListener("click", ()=>{
  navigator.clipboard.writeText(emojiBox.innerText)
});
