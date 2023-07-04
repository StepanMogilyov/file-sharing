import { FolderOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

interface PropTypes {
  sourceName: string;
  contextMenuHandler: (e: React.MouseEvent, sourceName: string) => void;
  openFolderHandler: (folderPath: string) => void;
}

const FolderIcon: React.FC<PropTypes> = ({ sourceName, contextMenuHandler, openFolderHandler }) => {
  return (
    <div
      key={uuidv4()}
      onContextMenu={(e) => contextMenuHandler(e, sourceName)}
      onClick={() => openFolderHandler(sourceName)}
      style={{ cursor: "pointer", borderBottom: "1px solid black", position: "relative" }}>
      <FolderOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
      <span style={{ fontSize: 14 }}>{sourceName}</span>
    </div>
  );
};

export default FolderIcon;
