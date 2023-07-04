interface LogUserInt {
  email: string;
  password: string;
}

export default async function loginUser(user: LogUserInt) {
  const response = await fetch("/login-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  return response.json();
}
