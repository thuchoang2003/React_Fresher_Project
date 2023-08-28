import React, { useEffect, useState } from "react";
import { Table, theme } from "antd";
import { getUsersWithPaginate } from "../../apiService/apiServices.js";
import { useImmer } from "use-immer";
const TableUser = (props) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useImmer([]);

  const columns = [
    {
      title: "FullName",
      dataIndex: "fullname",
      key: "fullname",
      sorter: true,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      sorter: true,
    },
  ];
  const fetchDataUser = async () => {
    let res = await getUsersWithPaginate(current, pageSize);
    if (res && res.data) {
      console.log(res.data);
      setTotal(res?.data?.meta?.total);
      if (res.data && res.data.result) {
        let arrayData = [];
        arrayData = res.data.result.map((item, index) => {
          return {
            key: index,
            fullname: item.fullName,

            email: item.email,
            phone: item.phone,
            role: item.role,
            active: item.isActive ? "True" : "False",
          };
        });
        setDataSource(arrayData);
      }
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, [current, pageSize]);
  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ paddingTop: 20 }}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          pageSizeOptions: [5, 6, 7, 8],
          showSizeChanger: true,
          onChange: handleChangePage,
        }}
      />
    </>
  );
};
export default TableUser;
