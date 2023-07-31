export default async function deleteSource(pathToSource: string) {
  const response = await fetch("/delete-source", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ pathToSource }),
  });
  return response.json();
}
