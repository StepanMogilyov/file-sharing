import { CloudDownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import CopyButton from "../CopyButton/CopyButton";

interface PropTypes {
  sourceName: string;
  link: string;
  folderPath: string;
  downloadHandler: (pathToSource: string, sourceName: string, type: string) => void;
  contextMenuHandler: (e: React.MouseEvent, sourceName: string) => void;
}

const FileIcon: React.FC<PropTypes> = ({ sourceName, folderPath, downloadHandler, link, contextMenuHandler }) => {
  const pathToSource = `${folderPath}/${sourceName}`;

  return (
    <span style={{ borderBottom: "1px solid black", display: "flex", justifyContent: "space-between" }}>
      <span key={uuidv4()} onContextMenu={(e) => contextMenuHandler(e, sourceName)} style={{ cursor: "pointer" }}>
        <FileTextOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
        <span style={{ fontSize: 14 }}>{sourceName}</span>
      </span>
      <span onClick={() => downloadHandler(pathToSource, sourceName, "file")}>
        <CloudDownloadOutlined />
      </span>
      <span>{link.length ? <CopyButton link={link} /> : <></>}</span>
    </span>
  );
};

export default FileIcon;
