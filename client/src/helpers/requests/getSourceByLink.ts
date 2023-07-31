export default async function getSourceByLink(link: string) {
  const response = await fetch("/get-source-by-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ link }),
  });
  return response.json();
}
