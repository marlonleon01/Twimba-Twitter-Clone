import { tweetsData } from "./data.js"

const tweetBtn = document.getElementById("tweet-btn")
const tweetInput = document.getElementById("tweet-input")

tweetBtn.addEventListener("click", () => console.log(tweetInput.value))