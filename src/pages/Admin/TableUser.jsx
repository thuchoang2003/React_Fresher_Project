import React from "react";
import { Table, theme } from "antd";
const TableUser = (props) => {
  const { token } = theme.useToken();

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const data = dataSource
    .concat(dataSource)
    .concat(dataSource)
    .concat(dataSource);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: true,
    },
  ];
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        style={{ paddingTop: 20 }}
        pagination={{
          current: 1,
          pageSize: 1,
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
        }}
      />
      ;
    </>
  );
};
export default TableUser;
