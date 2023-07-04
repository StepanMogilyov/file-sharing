export default async function deleteSource(folderPath: string) {
  const response = await fetch("/delete-source", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ folderPath }),
  });
  return response.json();
}
