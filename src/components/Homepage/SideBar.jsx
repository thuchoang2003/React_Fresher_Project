import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import "../../assets/scss/Sidebar.scss";
import { Button, Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Sách khoa học", "1", <ContainerOutlined />),
  getItem("Truyện tranh", "2", <ContainerOutlined />),
  getItem("Sách tham khảo", "3", <ContainerOutlined />),
  getItem("Đồ Chơi - Mẹ & Bé", "4", <PieChartOutlined />),
  getItem("Điện Thoại - Máy Tính Bảng", "5", <DesktopOutlined />),
  getItem("Làm Đẹp - Sức Khỏe", "6", <ContainerOutlined />),
  getItem("Điện Gia Dụng", "7", <ContainerOutlined />),
  getItem("Thời trang nữ", "8", <ContainerOutlined />),
  getItem("Thời trang nam", "9", <ContainerOutlined />),
  getItem("Giày - Dép nữ ", "10", <ContainerOutlined />),
  getItem("Túi thời trang nữ", "11", <ContainerOutlined />),
  getItem("Túi thời trang nam", "12", <ContainerOutlined />),
  getItem("Balo và Vali", "13", <ContainerOutlined />),
  getItem("Laptop - Máy Vi Tính", "14", <ContainerOutlined />),
  getItem("Nhà Cửa - Đời Sống", "15", <ContainerOutlined />),
  getItem("Cross Border - Hàng Quốc Tế", "16", <ContainerOutlined />),
  getItem("Bách Hóa Online", "3", <ContainerOutlined />),
  getItem("Thiết Bị Số - Phụ Kiện Số", "17", <ContainerOutlined />),
  getItem("Voucher - Dịch vụ", "18", <ContainerOutlined />),
  getItem("Thể Thao - Dã Ngoại", "19", <ContainerOutlined />),
];
const SideBar = (props) => {
  return (
    <>
      <div className="div-sidebar">
        <div className="title_Sidebar">Danh mục</div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          items={items}
        />
      </div>
    </>
  );
};
export default SideBar;
