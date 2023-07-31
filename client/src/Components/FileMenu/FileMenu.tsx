import { FileTextOutlined, FolderOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { v4 as uuidv4 } from "uuid";

import CopyButton from "../CopyButton/CopyButton";
import { PropTypes } from "../FolderIcon/FolderIcon";
import DownloadButton from "../DownloadButton/DownloadButton";

interface AddProp extends PropTypes {
  type: string;
}

const FileMenu: React.FC<AddProp> = ({ sourceName, folderPath, link, type, downloadHandler, openFolderHandler, shareSourceHandler, deleteSourceHandler }) => {
  const pathToSource = `${folderPath}/${sourceName}`;

  const menu = (
    <Menu>
      {!link.length && (
        <Menu.Item key="1" onClick={() => shareSourceHandler(sourceName, pathToSource, folderPath)}>
          Поделиться
        </Menu.Item>
      )}
      <Menu.Item key="2" onClick={() => deleteSourceHandler(pathToSource)}>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {type === "folder" && (
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <span key={uuidv4()} onClick={() => (openFolderHandler ? openFolderHandler(sourceName) : null)} style={{ cursor: "pointer" }}>
              <FolderOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
              <span style={{ fontSize: 14 }}>{sourceName}</span>
            </span>

            <span style={{ marginLeft: "auto" }}>
              <span>{link.length ? <CopyButton link={link} /> : <></>}</span>
              <span onClick={() => downloadHandler(pathToSource, sourceName, type)}>
                <DownloadButton />
              </span>
            </span>
          </div>
        </Dropdown>
      )}

      {type === "file" && (
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <span key={uuidv4()}>
              <FileTextOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
              <span style={{ fontSize: 14 }}>{sourceName}</span>
            </span>

            <span style={{ marginLeft: "auto" }}>
              <span>{link.length ? <CopyButton link={link} /> : <></>}</span>
              <span  onClick={() => downloadHandler(pathToSource, sourceName, type)}>
                <DownloadButton />
              </span>
            </span>
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default FileMenu;
