export default async function getSources(folderPath: string) {
  const response = await fetch("/get-sources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ folderPath }),
  });
  return response.json();
}
