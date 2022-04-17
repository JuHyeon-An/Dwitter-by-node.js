import * as userData from "./auth.js";

let tweets = [
  {
    id: "1", // 트윗 아이디
    text: "my first tweet", // 트윗 텍스트
    createdAt: new Date().toString(), // 트윗 생성 날짜
    userId: "1",
  },
  {
    id: "2", // 트윗 아이디
    text: "my second tweet", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userData.findById(tweet.userId);
      // 기존 트윗에 id를 통해 찾은 user정보 추가
      return { ...tweet, username, name, url };
    })
  );
}

export async function getByUsername(username) {
  return getAll().then((tweets) => {
    console.log(tweets);
    tweets.filter((tweet) => tweet.username === username);
  });
}

export async function getById(tweetId) {
  const found = tweets.find((tweet) => tweet.id === tweetId);
  if (!found) {
    return null;
  }

  console.log(userData.findById(found.userId));

  const { username, name, url } = await userData.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };

  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(tweetId, text) {
  const index = tweets.findIndex((tweet) => tweet.id == tweetId);
  // tweet = tweets.find((tweet) => tweet.id == tweetId)
  if (tweets[index]) {
    tweets[index].text = text;
  }
  return tweets[index];
}

export async function remove(tweetId) {
  const index = tweets.findIndex((tweet) => tweet.id == tweetId);
  // tweets = tweets.filter((tweet) => tweet.id !== tweetId);
  tweets.splice(index, 1);
}
