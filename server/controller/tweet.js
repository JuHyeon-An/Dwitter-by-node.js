import * as tweetFunctions from "../data/tweet.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const result = await (username
    ? tweetFunctions.getByUsername(username)
    : tweetFunctions.getAll());
  res.status(200).json(result);
}

export async function getTweet(req, res) {
  const tweetId = req.params.id;
  const result = await tweetFunctions.getById(tweetId);

  if (result) {
    res.status(200).json(result);
    console.log(result);
  } else {
    res.status(404).json({ message: `Tweet id(${params.id}) not found` });
  }
}

export async function createTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = await tweetFunctions.create(text, name, username);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const text = req.body.text;
  const tweetId = req.params.id;
  const tweet = await tweetFunctions.update(tweetId, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${params.id}) not found` });
  }
}

export async function deleteTweet(req, res) {
  const tweetId = req.params.id;
  await tweetFunctions.remove(tweetId);
  res.sendStatus(204);
}
