import React from 'react';
import {Layout, Menu, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {SolutionOutlined, UserOutlined} from '@ant-design/icons';
import './Header.scss';

const Header = () => {
  return (
    <Layout.Header className="header">
      <div className="logo">
        <SolutionOutlined />
        &nbsp;
        РосТруд
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Панель</Link>
        </Menu.Item>
      </Menu>
      <div className="user">
        <Avatar icon={<UserOutlined />} />
        &nbsp;
        Даниил
      </div>
    </Layout.Header>
  );
};

export default Header;
