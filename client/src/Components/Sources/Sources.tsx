import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { FrownOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";
import { v4 as uuidv4 } from "uuid";

import { SourcesProps } from "../Main/Main";
import FolderIcon from "../FolderIcon/FolderIcon";
import FileIcon from "../FileIcon/FileIcon";
import deleteSource from "../../helpers/requests/deleteSource";
import shareSource from "../../helpers/requests/shareSource";
import downloadHandler from "../../helpers/requests/downloadSource";

interface PropTypes {
  sources: SourcesProps[];
  folderPath: string;
  updateHandler: () => void;
  openFolderHandler: (folderPath: string) => void;
  goBackHandler: () => void;
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

  const deleteSourceHandler = async () => {
    await deleteSource(selectedSource.current);
    setMenu(false);
    updateHandler();
  };

  const shareSourceHandler = async () => {
    const address = `${window.location.origin}/sharing/`;
    await shareSource(selectedSource.current, address);
    setMenu(false);
    updateHandler();
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
            <Menu>
              <Menu.Item onClick={deleteSourceHandler} key="delete">
                Удалить
              </Menu.Item>
              <Menu.Item onClick={shareSourceHandler} key="share">
                Поделиться
              </Menu.Item>
            </Menu>
          }>
          <div style={{ height: "100%" }} ref={menuRef}></div>
        </Dropdown>
      )}
      <div style={{ flexBasis: "20%", border: "2px solid black" }}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {sources.length ? (
            sources.map((source: SourcesProps) => {
              if (!source.sourceName.includes(".")) {
                return (
                  <FolderIcon
                    key={uuidv4()}
                    sourceName={source.sourceName}
                    folderPath={folderPath}
                    link={source.link}
                    downloadHandler={downloadHandler}
                    contextMenuHandler={contextMenuHandler}
                    openFolderHandler={openFolderHandler}
                  />
                );
              } else
                return (
                  <FileIcon
                    key={uuidv4()}
                    sourceName={source.sourceName}
                    folderPath={folderPath}
                    link={source.link}
                    downloadHandler={downloadHandler}
                    contextMenuHandler={contextMenuHandler}
                  />
                );
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
