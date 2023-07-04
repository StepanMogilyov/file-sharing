interface PropTypes {
  path: string;
  changeFolderHandler: (folderPath: string) => void;
}

const FolderPath: React.FC<PropTypes> = ({ path, changeFolderHandler }) => {
  return (
    <>
      <button onClick={() => changeFolderHandler(path)} style={{ color: "blue", cursor: "pointer" }}>
        {path.split("/").pop()}
      </button>
      <span>/</span>
    </>
  );
};

export default FolderPath;
