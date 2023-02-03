import { tweetsData } from "./data.js"

const tweetBtn = document.getElementById("tweet-btn")
const tweetInput = document.getElementById("tweet-input")
const feed = document.getElementById("feed")

tweetBtn.addEventListener("click", () => console.log(tweetInput.value))

const getFeedHtml = () => {
    let feedHtml = ""
    
    for (let tweets of tweetsData) {
        feedHtml += `<div class="tweet">
                        <div class="tweet-inner">
                            <img src="${tweets.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${tweets.handle}</p>
                                <p class="tweet-text">${tweets.tweetText}</p>
                                <div class="tweet-details">
                                    <span class="tweet-detail">
                                        ${tweets.replies.length}
                                    </span>
                                    <span class="tweet-detail">
                                        ${tweets.likes}
                                    </span>
                                    <span class="tweet-detail">
                                        ${tweets.retweets}
                                    </span>
                                </div>   
                            </div>            
                        </div>
                    </div>`
    }
}

getFeedHtml()