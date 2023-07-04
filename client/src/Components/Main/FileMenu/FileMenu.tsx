import type { MenuProps } from "antd";
import { Dropdown } from "antd";

const FileMenu: React.FC<any> = () => {
  const items: MenuProps["items"] = [
    {
      label: "Удалить",
      key: "1",
      // onClick: () => setShowModal(!showModal),
    },
  ];

  return (
    <Dropdown open={true} menu={{ items }} trigger={["contextMenu"]}>
      <div style={{ height: "100%" }}></div>
    </Dropdown>
  );
};

export default FileMenu;
