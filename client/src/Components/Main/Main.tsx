import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import getSources from "../../helpers/requests/getSources";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import Spinner from "../Spinner/Spinner";
import ContextMenu from "../ContextMenu/ContextMenu";
import Sources from "../Sources/Sources";
import FolderPath from "../FolderPath/FolderPath";

interface PropTypes {
  user: {
    name: string;
    surname: string;
    email: string;
    userId: number;
  };
}

export interface SourcesProps {
  sourceName: string;
  link: string;
}

const Main: React.FC<PropTypes> = ({ user }) => {
  const [sources, setSources] = useState<[] | null>(null);
  const [update, setUpdate] = useState<number>(0);
  const [folderPaths, setFolderPaths] = useState<string[]>([]);
  const folderPath = useRef<string>(user.userId.toString());

  useEffect(() => {
    initSources(folderPath.current);
    // eslint-disable-next-line
  }, [folderPath.current, update]);

  const initSources = async (folderPath: string) => {
    const sources = await getSources(folderPath);
    setSources(sources);
  };

  const goBackHandler = () => {
    const indexOfLastSlash = folderPath.current.lastIndexOf("/");
    const pathToPrevFolder = folderPath.current.substring(0, indexOfLastSlash);
    folderPath.current = pathToPrevFolder;
  };

  const changeFolderHandler = async (path: string) => {
    if (path !== user.userId.toString()) {
      const copyPaths = [...folderPaths];
      const indexOfPath = copyPaths.indexOf(path);
      folderPath.current = copyPaths[indexOfPath];
      copyPaths.splice(indexOfPath + 1, copyPaths.length);
      setFolderPaths(copyPaths);
    } else {
      folderPath.current = path;
      setFolderPaths([]);
    }
  };

  const updateHandler = () => {
    setUpdate((prev) => prev + 1);
  };

  const openFolderHandler = async (folderName: string) => {
    folderPath.current = folderPath.current + `/${folderName}`;
    setFolderPaths((prev) => [...prev, folderPath.current]);
  };

  if (!sources) return <Spinner />;

  return (
    <>
      <button onClick={() => changeFolderHandler(user.userId.toString())}>Main</button>
      {folderPaths.map((path) => (
        <FolderPath key={uuidv4()} path={path} changeFolderHandler={changeFolderHandler} />
      ))}
      <div style={{ display: "flex", height: "100%" }}>
        <Sources sources={sources} folderPath={folderPath.current} updateHandler={updateHandler} openFolderHandler={openFolderHandler} goBackHandler={goBackHandler} />
        <div style={{ flexBasis: "60%" }}>
          <ContextMenu updateHandler={updateHandler} folderPath={folderPath.current} />
        </div>
        <div style={{ flexBasis: "20%", border: "2px solid black" }}>
          <DragAndDrop updateHandler={updateHandler} sources={sources} folderPath={folderPath.current} user={user} />
        </div>
      </div>
    </>
  );
};

export default Main;
