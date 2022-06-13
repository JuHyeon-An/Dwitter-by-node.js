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

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() + user.username };
  users.push(created);

  return created.id;
}

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
