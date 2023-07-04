interface RegUserInt {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export default async function registrateUser(newUser: RegUserInt) {
  const response = await fetch("/registrate-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newUser),
  });
  return response.json();
}
