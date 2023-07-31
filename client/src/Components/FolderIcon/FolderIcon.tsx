import FileMenu from "../FileMenu/FileMenu";

export interface PropTypes {
  sourceName: string;
  folderPath: string;
  type: string;
  link: string;
  downloadHandler: (pathToSource: string, sourceName: string, type: string) => void;
  openFolderHandler?: (folderPath: string) => void;
  shareSourceHandler: (sourceName: string, pathToSource: string, folderPath: string) => void;
  deleteSourceHandler: (pathToSource: string) => void;
}

const FolderIcon: React.FC<PropTypes> = ({ sourceName, folderPath, type, link, downloadHandler, openFolderHandler, shareSourceHandler, deleteSourceHandler }) => {
  return (
    <span style={{ borderBottom: "1px solid black", display: "flex", justifyContent: "space-between" }}>
      <FileMenu
        sourceName={sourceName}
        folderPath={folderPath}
        link={link}
        type={type}
        downloadHandler={downloadHandler}
        openFolderHandler={openFolderHandler}
        shareSourceHandler={shareSourceHandler}
        deleteSourceHandler={deleteSourceHandler}
      />
    </span>
  );
};

export default FolderIcon;
