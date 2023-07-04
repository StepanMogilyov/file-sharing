import { FileTextOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

interface PropTypes {
  sourceName: string;
  contextMenuHandler: (e: React.MouseEvent, sourceName: string) => void;
}

const FileIcon: React.FC<PropTypes> = ({ sourceName, contextMenuHandler }) => {
  return (
    <div key={uuidv4()} onContextMenu={(e) => contextMenuHandler(e, sourceName)} style={{ cursor: "pointer", borderBottom: "1px solid black" }}>
      <FileTextOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
      <span style={{ fontSize: 14 }}>{sourceName}</span>
    </div>
  );
};

export default FileIcon;
