import { useEffect, useState } from "react";
import { CloudDownloadOutlined, FolderOutlined } from "@ant-design/icons";

import getSourceByLink from "../../helpers/requests/getSourceByLink";
import downloadHandler from "../../helpers/requests/downloadSource";

const Download = () => {
  const [source, setSource] = useState<any>({});
  const link = window.location.href;

  useEffect(() => {
    (async function () {
      const { source } = await getSourceByLink(link);
      setSource(source);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = () => {
    const { folderPath, sourceName, type } = source;
    const pathToSource = `${folderPath}/${sourceName}`;
    downloadHandler(pathToSource, sourceName, type);
  };

  return (
    <>
      {source && Object.keys(source).length > 0 && (
        <>
          <FolderOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
          <span style={{ fontSize: 14 }}>{source.sourceName}</span>
          <span onClick={clickHandler}>
            <CloudDownloadOutlined />
          </span>
        </>
      )}
      {!source && <>Файлы были удалены</>}
    </>
  );
};

export default Download;
