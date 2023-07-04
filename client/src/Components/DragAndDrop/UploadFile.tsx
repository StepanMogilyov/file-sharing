import { useState, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { UploadOutlined } from "@ant-design/icons";

import sendFiles from "../../helpers/requests/sendFiles";

export interface PropTypes {
  updateHandler: Dispatch<SetStateAction<void>>;
  setDuplicates: Dispatch<SetStateAction<File[]>>;
  sources: string[];
  folderPath: string;
}

const UploadFile: React.FC<PropTypes> = ({ updateHandler, sources, setDuplicates, folderPath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filesToUpload = useRef<File[]>([]);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const buttonStyle = {
    fontSize: 90,
    cursor: "pointer",
    color: isHovered ? "blue" : "yellow",
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      const fileList = Array.from(files);
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
    }
  };

  return (
    <div>
      <UploadOutlined onClick={handleFileUpload} style={buttonStyle} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />
      <input ref={fileInputRef} type="file" onChange={uploadHandler} style={{ display: "none" }} multiple />
    </div>
  );
};

export default UploadFile;
