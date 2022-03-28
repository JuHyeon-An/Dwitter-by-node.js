import express from "express";
import "express-async-errors";

const tweets = [
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

router.get("/", (req, res) => {
  const username = req.query.username;
  const result = username ? tweets.filter((tweet) => tweet.username == username) : tweets;
  res.status(200).json(result);
  // res.status(200).send("GET: /tweets");
});

router.get("/?username=:username", (req, res) => {
  res.status(200).send("GET: /tweets/?username=:username");
});

router.get("/:id", (req, res) => {
  res.status(200).send("GET: /tweets/:id");
});

router.post("/", (req, res) => {
  res.status(200).send("POST: /tweets");
});

router.put("/:id", (req, res) => {
  res.status(200).send("PUT: /tweets/:id");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("DELETE: /tweets/:id");
});

export default router;
