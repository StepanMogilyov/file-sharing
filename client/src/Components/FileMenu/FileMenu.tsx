import { FileTextOutlined, FolderOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { v4 as uuidv4 } from "uuid";

import CopyButton from "../CopyButton/CopyButton";
import DownloadButton from "../DownloadButton/DownloadButton";

export interface PropTypes {
  sourceName: string;
  folderPath: string;
  type: string;
  link: string;
  downloadHandler: (pathToSource: string, sourceName: string, type: string) => void;
  openFolderHandler: (folderPath: string) => void;
  shareSourceHandler: (sourceName: string, pathToSource: string, folderPath: string) => void;
  deleteSourceHandler: (pathToSource: string) => void;
}

const FileMenu: React.FC<PropTypes> = ({ sourceName, folderPath, link, type, downloadHandler, openFolderHandler, shareSourceHandler, deleteSourceHandler }) => {
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
      <span style={{ borderBottom: "1px solid black", display: "flex", justifyContent: "space-between" }}>
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
      </span>

      <span style={{ borderBottom: "1px solid black", display: "flex", justifyContent: "space-between" }}>
        {type === "file" && (
          <Dropdown overlay={menu} trigger={["contextMenu"]}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <span key={uuidv4()}>
                <FileTextOutlined rev="" style={{ fontSize: 30, color: "orange" }} />
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
      </span>
    </>
  );
};

export default FileMenu;
