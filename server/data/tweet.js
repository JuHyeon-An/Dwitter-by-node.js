let tweets = [
  {
    id: "1", // 트윗 아이디
    text: "my first tweet", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "Ellen", // 사용자 이름
    username: "Ellen123", // 사용자 닉네임 (아이디)
    url: "https://cdn-icons.flaticon.com/png/512/3153/premium/3153346.png?token=exp=1648391233~hmac=3b53e948140a21acf9bd0fc7cd52086f", // 사용자 프로파일 사진 URL }];
  },
  {
    id: "2", // 트윗 아이디
    text: "my second tweet", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "Jennifer", // 사용자 이름
    username: "Jennifer123", // 사용자 닉네임 (아이디)
    url: "https://cdn-icons.flaticon.com/png/512/3153/premium/3153346.png?token=exp=1648391233~hmac=3b53e948140a21acf9bd0fc7cd52086f", // 사용자 프로파일 사진 URL }];
  },
];

export async function getAll() {
  return tweets;
}

export async function getByUsername(username) {
  return tweets.filter((tweet) => tweet.username == username);
}

export async function getById(tweetId) {
  return tweets.find((tweet) => tweet.id == tweetId);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
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
