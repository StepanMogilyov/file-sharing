import { useState } from "react";
import { message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

interface PropTypes {
  link: string;
}

const CopyButton: React.FC<PropTypes> = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Ссылка скопирована",
    });
  };

  const copyLinkHandler = (link: string) => {
    navigator.clipboard.writeText(link);
    success();
  };

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    color: isHovered ? "orange" : "black",
    cursor: "pointer",
    fontSize: "2em",
  };

  return (
    <>
      {contextHolder}
      <CopyOutlined style={buttonStyle} onClick={() => copyLinkHandler(link)} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />
    </>
  );
};

export default CopyButton;
