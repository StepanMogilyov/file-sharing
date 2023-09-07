import { useEffect, useState } from "react";

const electron = window.require("electron");
const { ipcRenderer } = electron;

function App() {
  const [count, setCount] = useState(0);
  const folderPath = "1";

  // const addSyncFolderHandler = () => {
  //   ipcRenderer.send("addSyncFolder");
  //   setCount((prev) => prev + 1);
  // };

  useEffect(() => {
    (async function () {
      const response = await fetch("/get-sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ folderPath }),
      });
      return response.json();
    })();
  }, []);

  const test = async () => {};

  return (
    <>
      <button onClick={test}>123</button>
      {/* 
      <div>{count}</div> 
      */}
    </>
  );
}

export default App;
