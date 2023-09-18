import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Pagination } from "antd";
import { getHistory } from "../../apiService/apiServices";
import moment from "moment";
const History = (props) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Trạng thái",
      key: "tags",
      dataIndex: "tags",
      render: () => (
        <>
          <Tag color={"green"}>Thành công</Tag>
        </>
      ),
    },
    {
      title: "Chi tiết",
      key: "detail",
      //       render: (_, record) => (
      //         <Space size="middle">
      //           <a>Invite {record.name}</a>
      //           <a>Delete</a>
      //         </Space>
      //       ),
    },
  ];
  const data = [];
  const fetchDataHistory = async () => {
    let res = await getHistory(current, pageSize);
    if (res && res.data) {
      console.log(res.data);
      setTotal(res?.data?.meta?.total);
      let arrayData = [];
      arrayData = res.data.result.map((item, index) => {
        return {
          stt: index,
          time: moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss"),
          price: item.totalPrice,
        };
      });
      setDataSource(arrayData);
    } else console.log(res);
  };
  useEffect(() => {
    fetchDataHistory();
  }, [current, pageSize]);

  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", sorter);
  };
  return (
    <>
      <div style={{ maxWidth: "1440px", margin: "0px auto" }}>
        <div style={{ fontSize: "16px", fontWeight: 500, padding: "10px 5px" }}>
          Lịch sử mua hàng:
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
      </div>
    </>
  );
};
export default History;
