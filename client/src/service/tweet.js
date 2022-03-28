export default class TweetService {
  tweets = [
    {
      id: 1,
      text: "드림코딩에서 강의 들으면 너무 좋으다",
      createdAt: "2021-05-09T04:20:57.000Z",
      name: "Bob",
      username: "bob",
      url: "https://cdn-icons.flaticon.com/png/512/4140/premium/4140076.png?token=exp=1648388539~hmac=05f34c45a81af9f8faa885d70b7ac1f5",
    },
  ];

  async getTweets(username) {
    return username ? this.tweets.filter((tweet) => tweet.username === username) : this.tweets;
  }

  async postTweet(text) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: "Ellie",
      username: "ellie",
      text,
    };
    this.tweets.push(tweet);
    return tweet;
  }

  async deleteTweet(tweetId) {
    this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
  }

  async updateTweet(tweetId, text) {
    const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    if (!tweet) {
      throw new Error("tweet not found!");
    }
    tweet.text = text;
    return tweet;
  }
}
