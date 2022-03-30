import * as tweetFunctions from "./data/tweet.js";

export function getTweets(req, res) {
  const username = req.query.username;
  const result = username ? tweetFunctions.getByUsername(username) : tweetFunctions.getAll();
  res.status(200).json(result);
}

export function getTweet(req, res) {
  const tweetId = req.params.id;
  const result = tweetFunctions.getById(tweetId);

  if (result) {
    res.status(200).json(result);
    console.log(result);
  } else {
    res.status(404).json({ message: `Tweet id(${params.id}) not found` });
  }
}

export function createTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = tweetFunctions.create(text, name, username);
  res.status(201).json(tweet);
}

export function updateTweet(req, res) {
  const text = req.body.text;
  const tweetId = req.params.id;
  const tweet = tweetFunctions.update(tweetId, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${params.id}) not found` });
  }
}

export function deleteTweet(req, res) {
  const tweetId = req.params.id;
  tweetFunctions.remove(tweetId);
  res.sendStatus(204);
}
