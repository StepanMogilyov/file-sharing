export default async function openFolder(userId: number) {
  const response = await fetch("/open-folder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  return response.json();
}
