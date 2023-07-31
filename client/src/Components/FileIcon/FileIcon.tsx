import FileMenu from "../FileMenu/FileMenu";

interface PropTypes {
  sourceName: string;
  folderPath: string;
  type: string;
  link: string;
  downloadHandler: (pathToSource: string, sourceName: string, type: string) => void;
  shareSourceHandler: (sourceName: string, pathToSource: string, folderPath: string) => void;
  deleteSourceHandler: (pathToSource: string) => void;
}

const FileIcon: React.FC<PropTypes> = ({ sourceName, folderPath, downloadHandler, type, link, shareSourceHandler, deleteSourceHandler }) => {
  return (
    <span style={{ borderBottom: "1px solid black", display: "flex", justifyContent: "space-between" }}>
      <FileMenu
        sourceName={sourceName}
        folderPath={folderPath}
        link={link}
        type={type}
        downloadHandler={downloadHandler}
        shareSourceHandler={shareSourceHandler}
        deleteSourceHandler={deleteSourceHandler}
      />
    </span>
  );
};

export default FileIcon;
