export default async function checkUser() {
  const response = await fetch("/check-user", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}
