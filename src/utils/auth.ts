interface User {
  username: string;
  password: string;
}

const users: User[] = [
  { username: "user1", password: "123" },
  { username: "user2", password: "123" },
  { username: "admin", password: "admin" },
];

export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};
