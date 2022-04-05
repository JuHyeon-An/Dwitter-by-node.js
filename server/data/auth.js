import jwt from "jsonwebtoken";

let users = [
  {
    username: "user1",
    password: "asdf",
    text: "new Tweet",
    name: "Jennifer",
    email: "jennifer@mail.com",
  },
];

export function signup(userInfo) {
  const { username, password, text, name, email } = userInfo;
  // 패스워드 암호화?
  const token = jwt.sign(
    {
      username: username,
      password: password,
      isAmdin: false,
    },
    "asdf"
  );

  const user = {
    username,
    password,
    text,
    name,
    email,
  };

  users = [user, ...users];
  return user;
}

export function login(userInfo) {
  const { username, password } = userInfo;
  const user = users.find((user) => user.username == username);
  return user;
}

export function findByUsername(username) {
  users.find((user) => (user.username = username));
  return user;
}
