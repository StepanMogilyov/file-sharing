import { useState, useRef, DragEvent, Dispatch, SetStateAction } from "react";
import { UserInt } from "../../store/user/actionCreators";
import Warning from "../Warning/Warning";
import UploadFile from "./UploadFile";
import sendFiles from "../../helpers/requests/sendFiles";

interface PropTypes {
  updateHandler: Dispatch<SetStateAction<void>>;
  sources: string[];
  folderPath: string;
}

const DragAndDrop: React.FC<PropTypes & { user: UserInt }> = ({ updateHandler, sources, folderPath, user }) => {
  const [duplicates, setDuplicates] = useState<File[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const filesToUpload = useRef<File[]>([]);

  const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackgroundColor("gray");
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackgroundColor("gray");
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    setBackgroundColor("rgb(126, 121, 115)");
  };

  const fileHandlers = {
    replaceFile: async (prevFileName: string) => {
      const indexOfDuplicate = duplicates.findIndex((item) => item.name === prevFileName);
      filesToUpload.current.push(duplicates[indexOfDuplicate]);
      const copyDubbedAndClearPrevFile = [...duplicates];
      copyDubbedAndClearPrevFile.splice(indexOfDuplicate, 1);
      setDuplicates(copyDubbedAndClearPrevFile.slice());
      if (!copyDubbedAndClearPrevFile.length) {
        await sendFiles(filesToUpload.current, folderPath);
        updateHandler();
      }
    },

    notUploadFile: (prevFileName: string) => {
      const indexOfDuplicate = duplicates.findIndex((item) => item.name === prevFileName);
      const copyDubbedAndClearPrevFile = [...duplicates];
      copyDubbedAndClearPrevFile.splice(indexOfDuplicate, 1);
      setDuplicates(copyDubbedAndClearPrevFile.slice());
    },

    uploadAndRenameFile: async (prevFileName: string, newFileName: string) => {
      const indexOfDuplicate = duplicates.findIndex((item) => item.name === prevFileName);
      const updatedFile = new File([duplicates[indexOfDuplicate]], newFileName);
      filesToUpload.current.push(updatedFile);
      const copyDubbedAndClearPrevFile = [...duplicates];
      copyDubbedAndClearPrevFile.splice(indexOfDuplicate, 1);
      setDuplicates(copyDubbedAndClearPrevFile.slice());
      if (!copyDubbedAndClearPrevFile.length) {
        await sendFiles(filesToUpload.current, folderPath);
        updateHandler();
      }
    },
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackgroundColor("rgb(126, 121, 115)");
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const files = e.dataTransfer.files;
      uploadHandler(Array.from(files));
    }
  };

  const uploadHandler = async (fileList: File[]) => {
    const dubbed = [];
    for (const file of fileList) {
      if (sources.includes(file.name)) {
        dubbed.push(file);
      } else {
        filesToUpload.current.push(file);
      }
    }

    if (dubbed.length) {
      setDuplicates(dubbed);
    } else {
      await sendFiles(filesToUpload.current, folderPath);
      updateHandler();
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          background: backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          transition: "background-color 0.3s ease",
        }}
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}>
        <UploadFile updateHandler={updateHandler} sources={sources} setDuplicates={setDuplicates} folderPath={folderPath} />
        {duplicates.length > 0 && <Warning fileHandlers={fileHandlers} duplicates={duplicates} setDuplicates={setDuplicates} />}
      </div>
    </>
  );
};

export default DragAndDrop;
