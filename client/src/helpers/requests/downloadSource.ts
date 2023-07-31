export default function downloadHandler(pathToSource: string, sourceName: string, type: string) {
  return (async () => {
    try {
      const response = await fetch("/download-sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pathToSource, sourceName, type }),
      });
      const toBlob = await response.blob();
      const url = window.URL.createObjectURL(toBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = sourceName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error: ", error);
      alert("Ошибка");
    }
  })();
}
