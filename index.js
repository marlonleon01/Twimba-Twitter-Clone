import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click", event => {
    if (event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
    } 
    
    if (event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet)
    } 

    if (event.target.dataset.reply) {
        handleReplyClick(event.target.dataset.reply)
    }

    if (event.target.id === "tweet-btn") {
        handleTweetBtnClick()
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

const handleReplyClick = (replyId) => {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

const handleTweetBtnClick = () => {
    const tweetInput = document.getElementById("tweet-input")
    
    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        },)
        tweetInput.value = ""
    } 
    render()
}

const getFeedHtml = () => {
    let feedHtml = ""
    
    tweetsData.forEach(tweets => {
        let likeIconClass = ""
        
        if (tweets.isLiked) {
            likeIconClass = "liked"
        }

        let retweetIconClass = ""

        if (tweets.isRetweeted) {
            retweetIconClass = "retweeted"
        }

        let repliesHtml = ""

        if (tweets.replies.length > 0) {
            tweets.replies.forEach(reply => {
                repliesHtml += `<div class="tweet-reply">
                                <div class="tweet-inner">
                                    <img src="${reply.profilePic}" class="profile-pic">
                                        <div>
                                            <p class="handle">${reply.handle}</p>
                                            <p class="tweet-text">${reply.tweetText}</p>
                                        </div>
                                    </div>
                            </div>`
            })
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
                        <div class="hidden" id="replies-${tweets.uuid}">
                            ${repliesHtml}
                        </div> 
                    </div>`
    })
    return feedHtml
}

const render = () => {
   document.getElementById("feed").innerHTML = getFeedHtml()
}

render()