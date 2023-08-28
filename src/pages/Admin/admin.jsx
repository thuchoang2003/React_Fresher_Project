import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
import InputSearch from "./InputSearch";
import TableUser from "./TableUser";
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
      <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
        <div className="demo-logo-vertical" />
        <div className="sidebar-admin_title">Admin</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["Dashboard"]}
          items={[
            getItem(
              <Link
                to="/admin"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Dashboard
              </Link>,
              "Dashboard",
              <UserOutlined />
            ),
            getItem("Manager Users", "sub2", <MailOutlined />, [
              getItem("Option 1", "1"),
              getItem("Option 2", "2"),
              getItem("Option 3", "3"),
              getItem("Option 4", "4"),
            ]),
            getItem("Manager Books", "sub3", <AppstoreOutlined />, [
              getItem("Option 5", "5"),
              getItem("Option 6", "6"),
            ]),
            getItem("Manager Orders", "sub4", <SettingOutlined />, [
              getItem("Option 9", "9"),
              getItem("Option 10", "10"),
              getItem("Option 11", "11"),
              getItem("Option 12", "12"),
            ]),
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
            size="large"
          >
            <a>
              <Space size={"large"}>
                Welcome, I'm Admin
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <InputSearch />
          <TableUser />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminHomepage;
