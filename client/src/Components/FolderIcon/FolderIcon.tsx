import { CloudDownloadOutlined, FolderOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import CopyButton from "../CopyButton/CopyButton";

interface PropTypes {
  sourceName: string;
  folderPath: string;
  link: string;
  downloadHandler: (pathToSource: string, sourceName: string, type: string) => void;
  contextMenuHandler: (e: React.MouseEvent, sourceName: string) => void;
  openFolderHandler: (folderPath: string) => void;
}

const FolderIcon: React.FC<PropTypes> = ({ sourceName, folderPath, link, downloadHandler, contextMenuHandler, openFolderHandler }) => {
  const pathToSource = `${folderPath}/${sourceName}`;

  return (
    <span style={{ borderBottom: "1px solid black", display: "flex", justifyContent: "space-between" }}>
      <span key={uuidv4()} onContextMenu={(e) => contextMenuHandler(e, sourceName)} onClick={() => openFolderHandler(sourceName)} style={{ cursor: "pointer" }}>
        <FolderOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
        <span style={{ fontSize: 14 }}>{sourceName}</span>
      </span>
      <span onClick={() => downloadHandler(pathToSource, sourceName, "folder")}>
        <CloudDownloadOutlined />
      </span>
      <span>{link.length ? <CopyButton link={link} /> : <></>}</span>
    </span>
  );
};

export default FolderIcon;
