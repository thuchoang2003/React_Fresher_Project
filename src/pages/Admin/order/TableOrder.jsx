import React, { useEffect, useState } from "react";
import moment from "moment";

import { Table, theme, Button, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getHistory } from "../../../apiService/apiServices";
const TableOrder = (props) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      sorter: true,
      render: (text, record, index) => {
        return (
          <a
            href="#"
            //     onClick={(event) => {
            //       event.preventDefault();
            //       setOpenBookDetail(!openBookDetail);
            //       setDataBookDetail(record);
            //     }}
          >
            {record.ID}
          </a>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "time",
      key: "time",
      sorter: true,
    },
  ];
  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log(sorter);
  };
  const fetchData = async () => {
    let res = await getHistory(current, pageSize);
    if (res && res.data) {
      console.log(res.data);
      setTotal(res?.data?.meta?.total);
      let arrayData = [];
      arrayData = res.data.result.map((item, index) => {
        return {
          ID: item._id,
          price: item.totalPrice,
          name: item.name,
          address: item.address,
          phone: item.phone,
          time: moment(item.updatedAt).format("DD-MM-YYYY hh:mm:ss"),
        };
      });
      setDataSource(arrayData);
    } else console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, [current, pageSize]);
  return (
    <>
      <div style={{ fontSize: "16px", fontWeight: 500, padding: "20px 20px" }}>
        Table Orders
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ paddingTop: 20 }}
        onChange={onChange}
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
export default TableOrder;
