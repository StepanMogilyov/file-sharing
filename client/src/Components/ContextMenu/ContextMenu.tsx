import { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Input, Modal, Space } from "antd";

import createFolder from "../../helpers/requests/createFolder";

export interface PropTypes {
  updateHandler: () => void;
  folderPath: string;
}

const ContextMenu: React.FC<PropTypes> = ({ updateHandler, folderPath }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      label: "Создать папку",
      key: "1",
      onClick: () => setShowModal(!showModal),
    },
  ];

  let folderName = "";

  const updateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    folderName = e.target.value;
  };

  const createFolderHandler = async () => {
    closeModalHandler();
    await createFolder(folderPath, folderName);
    updateHandler();
  };

  const closeModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        <div style={{ height: "100%" }}></div>
      </Dropdown>
      {showModal && (
        <Modal footer={null} open={showModal} onCancel={closeModalHandler}>
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="Введите название папки" onChange={updateInputHandler} name="folderName" />
            <Button style={{ marginRight: "40px" }} onClick={createFolderHandler} type="primary">
              Submit
            </Button>
          </Space.Compact>
        </Modal>
      )}
    </>
  );
};

export default ContextMenu;
