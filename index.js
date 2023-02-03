import { tweetsData } from "./data.js"

const tweetBtn = document.getElementById("tweet-btn")
const tweetInput = document.getElementById("tweet-input")

tweetBtn.addEventListener("click", () => console.log(tweetInput.value))

document.addEventListener("click", event => {
    if (event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
    } if (event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet)
    }
})

const handleLikeClick = (tweetId) => {
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
        
    } else {
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

const handleRetweetClick = (tweedId) => {
    const targetTweetObj = tweetsData.filter(tweet => {
        return tweet.uuid === tweedId
    })[0]
    
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

const getFeedHtml = () => {
    let feedHtml = ""
    
    tweetsData.forEach(tweets => {
        let likeIconClass = ""
        let retweetIconClass = ""

        if (tweets.isLiked) {
            likeIconClass = "liked"
        }
        if (tweets.isRetweeted) {
            retweetIconClass = "retweeted"
        }

        feedHtml += `<div class="tweet">
                        <div class="tweet-inner">
                            <img src="${tweets.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${tweets.handle}</p>
                                <p class="tweet-text">${tweets.tweetText}</p>
                                <div class="tweet-details">
                                    <span class="tweet-detail">
                                        <i 
                                        class="fa-regular fa-comment-dots"
                                        data-reply="${tweets.uuid}"
                                        >
                                        </i>
                                        ${tweets.replies.length}
                                    </span>
                                    <span class="tweet-detail">
                                        <i 
                                        class="fa-solid fa-heart ${likeIconClass}"
                                        data-like="${tweets.uuid}"
                                        >
                                        </i>
                                        ${tweets.likes}
                                    </span>
                                    <span class="tweet-detail">
                                        <i 
                                        class="fa-solid fa-retweet ${retweetIconClass}"
                                        data-retweet="${tweets.uuid}"
                                        >
                                        </i>
                                        ${tweets.retweets}
                                    </span>
                                </div>   
                            </div>            
                        </div>
                    </div>`
    })
    return feedHtml
}

const render = () => {
   document.getElementById("feed").innerHTML = getFeedHtml()
}

render()