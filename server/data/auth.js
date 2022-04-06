import jwt from "jsonwebtoken";

let users = [
  {
    username: "user1",
    password: "asdf",
    text: "new Tweet",
    name: "Jennifer",
    email: "jennifer@mail.com",
    url: "",
  },
];

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() + "user.username" };
  users.push(created);

  return created.id;
}

export function findByUsername(username) {
  return !!users.find((user) => user.username === username);
}
