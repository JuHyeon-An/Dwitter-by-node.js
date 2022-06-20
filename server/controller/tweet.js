import * as tweetData from "../data/tweet.js";
import { getSocketIO } from "../connection/socket.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const result = await (username ? tweetData.getByUsername(username) : tweetData.getAll());
  res.status(200).json(result);
}

export async function getTweet(req, res) {
  const tweetId = req.params.id;
  const result = await tweetData.getById(tweetId);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: `Tweet id(${tweetId}) not found` });
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetData.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
}

export async function updateTweet(req, res, next) {
  const text = req.body.text;
  const tweetId = req.params.id;
  const tweet = await tweetData.getById(tweetId);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${tweetId}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetData.update(tweetId, text);
  // 업데이트 된 트윗을 전달
  res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
  const tweetId = req.params.id;
  const tweet = await tweetData.getById(tweetId);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${tweetId}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetData.remove(tweetId);
  res.sendStatus(204);
}
