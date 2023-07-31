export default async function shareSource(sourcePath: string, address: string) {
  const response = await fetch("/share-source", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ sourcePath, address }),
  });
  return response;
}
