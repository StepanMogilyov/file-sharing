import { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";

interface PropTypes {
  duplicates: File[];
  setDuplicates: Dispatch<SetStateAction<File[]>>;
  fileHandlers: {
    replaceFile: (file: string) => void;
    notUploadFile: (prevFileName: string) => void;
    uploadAndRenameFile: (prevFileName: string, newFileName: string) => void;
  };
}

const Warning: React.FC<PropTypes> = ({ fileHandlers, duplicates, setDuplicates }) => {
  const changeButtonColorHandler = (e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.background = "orange");
  const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.background = "gray");

  const handleCancel = () => {
    setDuplicates([]);
  };

  const getRenamedName = (file: string) => {
    const indexOfLastDot = file.lastIndexOf(".");
    const fileName = file.substring(0, indexOfLastDot);
    const ext = file.substring(indexOfLastDot, file.length);
    return `${fileName}(1)${ext}`;
  };

  return (
    <Modal className="modalStyle" footer={[]} open={true} onCancel={handleCancel}>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "orange", fontSize: 90 }}>
          <WarningOutlined />
        </div>
        <h2>Повторяющиеся элементы</h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div onClick={() => fileHandlers.replaceFile(duplicates[0].name)} style={{ paddingBottom: "5px", width: "80%", cursor: "pointer" }}>
          <div onMouseEnter={changeButtonColorHandler} onMouseLeave={mouseLeaveHandler} style={{ background: "gray", padding: "10px", borderRadius: "5px" }}>
            Заменить файл {duplicates[0].name}
          </div>
        </div>
        <div onClick={() => fileHandlers.notUploadFile(duplicates[0].name)} style={{ paddingBottom: "5px", width: "80%", cursor: "pointer" }}>
          <div onMouseEnter={changeButtonColorHandler} onMouseLeave={mouseLeaveHandler} style={{ background: "gray", padding: "10px", borderRadius: "5px" }}>
            Не загружать файл {duplicates[0].name}
          </div>
        </div>

        <div
          onClick={() => fileHandlers.uploadAndRenameFile(duplicates[0].name, getRenamedName(duplicates[0].name))}
          style={{ paddingBottom: "5px", width: "80%", cursor: "pointer" }}>
          <div onMouseEnter={changeButtonColorHandler} onMouseLeave={mouseLeaveHandler} style={{ background: "gray", padding: "10px", borderRadius: "5px" }}>
            Загрузить {duplicates[0].name} и переименовать в {getRenamedName(duplicates[0].name)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Warning;
