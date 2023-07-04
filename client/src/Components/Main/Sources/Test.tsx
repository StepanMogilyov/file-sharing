import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Test: React.FC = () => {
  const handleContextMenu = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
  };

  const menuItems = [
    { key: '1', label: 'Menu Item 1' },
    { key: '2', label: 'Menu Item 2' },
    { key: '3', label: 'Menu Item 3' },
  ];

  const menu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <span onContextMenu={handleContextMenu}>
          GO!!!!!!!! <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
};

export default Test;
