export default async function createFolder(folderPath: string, folderName: string) {
  const response = await fetch("/create-folder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ folderPath, folderName }),
  });
  return response.json();
}
