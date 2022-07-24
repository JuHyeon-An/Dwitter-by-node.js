import { db } from "../db/database.js";

/*
let users = [
  {
    id: "1",
    username: "user1",
    password: "$2b$10$kduLbJCQYW3cELHmc.XOzOFVw9NCcG9Xx9Pcq2C4UswxWEDiaGM/6",
    name: "Jennifer",
    email: "jennifer@mail.com",
    url: "",
  },
  {
    id: "2",
    username: "user2",
    password: "$2b$10$kduLbJCQYW3cELHmc.XOzOFVw9NCcG9Xx9Pcq2C4UswxWEDiaGM/6",
    name: "juhyeon",
    email: "juhyeon@mail.com",
    url: "",
  },
];
*/

export async function createUser(user) {
  const { username, password, name, email, url } = user;

  return db
    .execute("INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)", [
      username,
      password,
      name,
      email,
      url,
    ])
    .then((result) => {
      //console.log(result);
      return result;
    });
}

export async function findByUsername(username) {
  return db
    .execute("SELECT * FROM users WHERE username = ?", [username])
    .then((result) => result[0][0]);
  //return users.find((user) => user.username === username);
}

export async function findById(id) {
  return db.execute("SELECT * FROM users WHERE id = ?", [id]).then((result) => result[0][0]);
  //return users.find((user) => user.id === id);
}
