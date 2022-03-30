import express from "express";
import "express-async-errors";

let tweets = [
  {
    id: "id1", // 트윗 아이디
    text: "my first tweet", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "Ellen", // 사용자 이름
    username: "Ellen123", // 사용자 닉네임 (아이디)
    url: "https://cdn-icons.flaticon.com/png/512/3153/premium/3153346.png?token=exp=1648391233~hmac=3b53e948140a21acf9bd0fc7cd52086f", // 사용자 프로파일 사진 URL }];
  },
  {
    id: "id2", // 트윗 아이디
    text: "my second tweet", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "Jennifer", // 사용자 이름
    username: "Jennifer123", // 사용자 닉네임 (아이디)
    url: "https://cdn-icons.flaticon.com/png/512/3153/premium/3153346.png?token=exp=1648391233~hmac=3b53e948140a21acf9bd0fc7cd52086f", // 사용자 프로파일 사진 URL }];
  },
];

const router = express.Router();

router.use((req, res, next) => {
  console.log("middelware for tweets");
  next();
});

// get all tweets
router.get("/", (req, res) => {
  const username = req.query.username;
  const result = username ? tweets.filter((tweet) => tweet.username == username) : tweets;
  res.status(200).json(result);
});

// get tweet by id
router.get("/:id", (req, res) => {
  const tweetId = req.params.id;
  const result = tweets.find((tweet) => tweet.id == tweetId);

  if (result) {
    res.status(200).json(result);
    console.log(result);
  } else {
    res.status(404).json({ message: `Tweet id(${params.id}) not found` });
  }
});

// create new tweet
router.post("/", (req, res) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// update the tweet
router.put("/:id", (req, res) => {
  const text = req.body.text;
  const tweetId = req.params.id;
  console.log(tweets);
  const index = tweets.findIndex((tweet) => tweet.id == tweetId);
  // tweet = tweets.find((tweet) => tweet.id == tweetId)

  if (tweets[index]) {
    tweets[index].text = text;
    res.status(200).json(tweets);
  } else {
    res.status(404).json({ message: `Tweet id(${params.id}) not found` });
  }
});

router.delete("/:id", (req, res) => {
  const tweetId = req.params.id;
  const index = tweets.findIndex((tweet) => tweet.id == tweetId);
  // tweets = tweets.filter((tweet) => tweet.id !== tweetId);

  tweets.splice(index, 1);
  res.status(200).json(tweets);
});

export default router;
