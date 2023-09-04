import React, { useState } from "react";
import { Button, Drawer, Radio, Space, Descriptions, Badge } from "antd";

const UserDetailPage = (props) => {
  const { open, setOpen, dataUserDetailPage, setDataUserDetailPage } = props;
  const [placement, setPlacement] = useState("right");

  const onClose = () => {
    setOpen(false);
  };
  console.log(dataUserDetailPage);
  return (
    <>
      <Drawer
        title="Xem thông tin chi tiết người dùng"
        width={"50vw"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Descriptions title="User Info" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataUserDetailPage?.ID}
          </Descriptions.Item>
          <Descriptions.Item label="Active">
            {dataUserDetailPage?.active}
          </Descriptions.Item>
          <Descriptions.Item label="FullName">
            {dataUserDetailPage?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataUserDetailPage?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {dataUserDetailPage?.role}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {dataUserDetailPage?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="CreatedAt">
            {dataUserDetailPage?.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="UpdatedAt">
            {dataUserDetailPage?.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserDetailPage;
