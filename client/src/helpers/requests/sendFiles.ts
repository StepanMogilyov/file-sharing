export default async function sendFiles(fileList: File[], folderPath: string) {
  if (fileList.length) {
    const fileNames: string[] = [];
    const formData = new FormData();

    fileList.forEach((file: File) => {
      fileNames.push(file.name);
      formData.append("files", file);
    });

    try {
      const response = await fetch(`/send-file?folderPath=${folderPath}&fileNames=${JSON.stringify(fileNames)}`, {
        method: "POST",
        body: formData,
      });
      const toJson = await response.json();
      return toJson;
    } catch (error) {
      console.log("error: ", error);
    }
  } else {
    console.warn("Файлы не выбраны");
  }
}
