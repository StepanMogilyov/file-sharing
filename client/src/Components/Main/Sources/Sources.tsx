import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { FrownOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";
import { v4 as uuidv4 } from "uuid";

// import FileMenu from "../FileMenu/FileMenu";
import FolderIcon from "./FolderIcon/FolderIcon";
import FileIcon from "./FileIcon/FileIcon";
import deleteSource from "../../../helpers/requests/deleteSource";

interface PropTypes {
  sources: string[];
  folderPath: string;
  updateHandler: () => void;
  openFolderHandler: (folderPath: string) => void;
  goBackHandler: () => void;
}

interface MenuItemKeyType {
  key: string;
}

const Sources: React.FC<PropTypes> = ({ sources, folderPath, updateHandler, openFolderHandler, goBackHandler }) => {
  const [menu, setMenu] = useState(false);
  const [contextMenuEvent, setContextMenuEvent] = useState<React.MouseEvent>();
  const selectedSource = useRef("");
  const menuRef = useRef<HTMLDivElement>(null);

  const contextMenuHandler = (e: React.MouseEvent, sourceName: string) => {
    e.preventDefault();
    selectedSource.current = `${folderPath}/${sourceName}`;
    setMenu((prev) => !prev);
    setContextMenuEvent(e);
  };

  const menuClickHandler = async (item: MenuItemKeyType) => {
    await deleteSource(selectedSource.current);
    updateHandler();
    setMenu(false);
  };

  const dropdownMenuStyle: CSSProperties = {
    position: "fixed",
    left: contextMenuEvent?.clientX,
    top: contextMenuEvent?.clientY,
  };

  const getPopupContainer = (triggerNode: HTMLElement) => {
    return menuRef.current || document.body;
  };

  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener("click", clickOutsideHandler);

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  return (
    <>
      {menu && (
        <Dropdown
          visible={true}
          trigger={["contextMenu"]}
          overlayStyle={dropdownMenuStyle}
          getPopupContainer={getPopupContainer}
          overlay={
            <Menu onClick={menuClickHandler}>
              <Menu.Item key="delete">Удалить</Menu.Item>
            </Menu>
          }>
          <div style={{ height: "100%" }} ref={menuRef}></div>
        </Dropdown>
      )}
      <div style={{ flexBasis: "20%", border: "2px solid black" }}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {sources.length ? (
            sources.map((sourceName) => {
              if (!sourceName.includes(".")) {
                return <FolderIcon key={uuidv4()} sourceName={sourceName} contextMenuHandler={contextMenuHandler} openFolderHandler={openFolderHandler} />;
              } else {
                return <FileIcon key={uuidv4()} sourceName={sourceName} contextMenuHandler={contextMenuHandler} />;
              }
            })
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <h2>Файлов пока нет</h2>
              <div style={{ color: "orange", fontSize: 90 }}>
                <FrownOutlined />
              </div>
              <div>
                <Button onClick={goBackHandler} type="primary">
                  Вернуться
                  <RollbackOutlined />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sources;
