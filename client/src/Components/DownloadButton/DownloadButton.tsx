import { CloudDownloadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const DownloadButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    color: isHovered ? "orange" : "black",
    cursor: "pointer",
    fontSize: "2em"
  };

  return <CloudDownloadOutlined style={buttonStyle} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />;
};

export default DownloadButton;
