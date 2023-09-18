import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../../assets/scss/Admin.scss";
import { Layout, Menu, Button, theme, Dropdown, Space, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/counter/accountSlice";
import { postLogout } from "../../apiService/apiServices";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;
const AdminHomepage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let res = await postLogout();
    if (res && res.data) {
      message.success("Logout succesfully!");
      dispatch(doLogout());
      navigate("/login");
    }
  };
  const items = [
    {
      label: "Quản lý tài khoản",
      key: "1",
    },
    {
      label: "Đăng xuất",
      key: "2",
      onClick: handleLogout,
    },
  ];
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={"16%"}>
        <div className="demo-logo-vertical" />
        <div className="sidebar-admin_title">Admin</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["Dashboard"]}
          items={[
            getItem(
              <Link to="/admin">Dashboard</Link>,
              "Dashboard",
              <UserOutlined />
            ),
            getItem("Manager Users", "sub2", <MailOutlined />, [
              getItem(<Link to="user">CRUD</Link>, "CRUD"),
            ]),
            getItem(
              <Link to="book">Manager Books</Link>,
              "sub3",
              <AppstoreOutlined />
            ),
            getItem(
              <Link to="order">Manager Orders</Link>,
              "sub4",
              <SettingOutlined />
            ),
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{
              items,
            }}
            placement="topRight"
          >
            <a>
              <Space>
                Welcome, I'm Admin
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "5px 5px",
            padding: 5,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* <TableUser /> */}
          <Outlet />
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default AdminHomepage;
