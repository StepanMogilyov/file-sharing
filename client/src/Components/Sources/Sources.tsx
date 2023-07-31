import { FrownOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button } from "antd";
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

  const deleteSourceHandler = async (pathToSource: string) => {
    await deleteSource(pathToSource);
    updateHandler();
  };

  const shareSourceHandler = async (sourceName: string, pathToSource: string, folderPath: string) => {
    const address = `${window.location.origin}/sharing/`;
    const source = sources.find((item: SourcesProps) => item.sourceName === sourceName);

    if (!source) return;

    if (!source.link.length) {
      await shareSource(sourceName, pathToSource, folderPath, address);
      updateHandler();
    } else navigator.clipboard.writeText(source.link);
  };

  return (
    <>
      <div style={{ flexBasis: "20%", border: "2px solid black" }}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {sources.length ? (
            sources.map((source: SourcesProps) => {
              if (source.type === "folder") {
                return (
                  <FolderIcon
                    key={uuidv4()}
                    sourceName={source.sourceName}
                    folderPath={folderPath}
                    type={source.type}
                    link={source.link}
                    downloadHandler={downloadHandler}
                    openFolderHandler={openFolderHandler}
                    shareSourceHandler={shareSourceHandler}
                    deleteSourceHandler={deleteSourceHandler}
                  />
                );
              } else
                return (
                  <FileIcon
                    key={uuidv4()}
                    sourceName={source.sourceName}
                    folderPath={folderPath}
                    type={source.type}
                    link={source.link}
                    downloadHandler={downloadHandler}
                    shareSourceHandler={shareSourceHandler}
                    deleteSourceHandler={deleteSourceHandler}
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
