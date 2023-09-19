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
import { useEffect } from "react";

const { Header, Sider, Content, Footer } = Layout;
const AdminHomepage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [activeMenu, setActiveMenu] = useState("dashboard");
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
  useEffect(() => {
    if (window.location.pathname.includes("/book"))
      setActiveMenu("managerBook");
    else if (window.location.pathname.includes("/order"))
      setActiveMenu("managerOrder");
    else if (window.location.pathname.includes("/user"))
      setActiveMenu("managerUser");
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={"16%"}>
        <div className="demo-logo-vertical" />
        <div className="sidebar-admin_title">Admin</div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeMenu]}
          items={[
            getItem(
              <Link to="/admin">Dashboard</Link>,
              "dashboard",
              <UserOutlined />
            ),
            getItem("Manager Users", "managerUser", <MailOutlined />, [
              getItem(<Link to="user">CRUD</Link>, "CRUD"),
            ]),
            getItem(
              <Link to="book">Manager Books</Link>,
              "managerBook",
              <AppstoreOutlined />
            ),
            getItem(
              <Link to="order">Manager Orders</Link>,
              "managerOrder",
              <SettingOutlined />
            ),
          ]}
          onClick={(e) => setActiveMenu(e.key)}
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
