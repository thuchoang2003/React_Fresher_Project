// import React, { useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   DownOutlined,
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import "../../assets/scss/Admin.scss";
// import { Layout, Menu, Button, theme, Dropdown, Space, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// const HeaderAdmin = (props) => {
//   return (
//     <>
//       <Header
//         style={{
//           paddingLeft: 30,
//           paddingRight: 30,
//           background: colorBgContainer,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={() => setCollapsed(!collapsed)}
//           style={{
//             fontSize: "16px",
//             width: 64,
//             height: 64,
//           }}
//         />
//         <Dropdown
//           menu={{
//             items,
//           }}
//           placement="topRight"
//           size="large"
//         >
//           <a>
//             <Space size={"large"}>
//               Welcome, I'm Admin
//               <DownOutlined />
//             </Space>
//           </a>
//         </Dropdown>
//       </Header>
//     </>
//   );
// };
// export default HeaderAdmin;
