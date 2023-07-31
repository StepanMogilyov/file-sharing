import { CopyOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface PropTypes {
  link: string;
}

const CopyButton: React.FC<PropTypes> = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const copyLinkHandler = (link: string) => {
    navigator.clipboard.writeText(link);
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

  return <CopyOutlined style={buttonStyle} onClick={() => copyLinkHandler(link)} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />;
};

export default CopyButton;
