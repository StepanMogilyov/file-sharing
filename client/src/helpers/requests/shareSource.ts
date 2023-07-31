export default async function shareSource(sourceName: string, pathToSource: string, folderPath: string, address: string) {
  console.log(123);
  const response = await fetch("/share-source", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ sourceName, pathToSource, folderPath, address }),
  });
  return response;
}
