import { useEffect, useRef, useState } from "react";
import { CloudDownloadOutlined, FolderOutlined } from "@ant-design/icons";

import getSourceByLink from "../../helpers/requests/getSourceByLink";
import downloadHandler from "../../helpers/requests/downloadSource";

interface SourceTypes {
  id: number;
  folderPath: string;
  link: string;
  sourceName: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const Download = () => {
  const [source, setSource] = useState<SourceTypes | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mess = useRef("");

  const link = window.location.href;

  const buttonStyle = {
    color: isHovered ? "orange" : "black",
    cursor: "pointer",
    fontSize: "2em",
  };

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    (async function () {
      const { source, message } = await getSourceByLink(link);
      mess.current = message;
      setSource(source);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = () => {
    if (source) {
      const { folderPath, sourceName, type } = source;
      const pathToSource = `${folderPath}/${sourceName}`;
      downloadHandler(pathToSource, sourceName, type);
    }
  };

  return (
    <>
      {source && Object.keys(source).length > 0 && (
        <>
          <FolderOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
          <span style={{ fontSize: 14 }}>{source.sourceName}</span>
          <span onClick={clickHandler}>
            {!mess.current.length && <CloudDownloadOutlined style={buttonStyle} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />}
          </span>
        </>
      )}
      <br />
      {source && mess.current.length > 0 && <>{mess.current}</>}
    </>
  );
};

export default Download;
