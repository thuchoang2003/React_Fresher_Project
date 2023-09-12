import React, { useEffect, useState } from "react";
import moment from "moment";

import { Table, theme, Button, notification } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useImmer } from "use-immer";
import RenderHeaderTableBook from "./RenderHeaderTableBook";
import {
  getAllBooksWithPaginate,
  getBookCategory,
} from "../../../apiService/apiServices.js";
import InputSearchBook from "./InputSearchBook";
import BookDetailPage from "./BookDetailPage";
import ModalCreateBook from "./ModalCreateBook";

const TableBook = (props) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useImmer([]);
  const [queryFetchData, setQueryFetchData] = useState(
    `/book?current=${current}&pageSize=${pageSize}`
  );
  const [queryFilter, setQueryFilter] = useState();
  const [openBookDetail, setOpenBookDetail] = useState(false);
  const [dataBookDetail, setDataBookDetail] = useState();
  const [openCreateBook, setOpenCreateBook] = useState(false);
  const [dataCategory, setDataCategory] = useState();

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
            onClick={(event) => {
              event.preventDefault();
              setOpenBookDetail(!openBookDetail);
              setDataBookDetail(record);
            }}
          >
            {record.ID}
          </a>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "Nameofbook",
      key: "Nameofbook",
      sorter: true,
    },

    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
      sorter: true,
    },

    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      render: (text, record, index) => {
        return (
          <div>
            <Button
              icon={
                <DeleteOutlined style={{ color: "red", fontSize: "17px" }} />
              }
              type="text"
            ></Button>
            <Button
              icon={<EditOutlined style={{ fontSize: "17px" }} />}
              type="text"
            ></Button>
          </div>
        );
      },
    },
  ];
  const handleChangeQueryFilter = (queryAdd) => {
    setQueryFilter(queryAdd);
    setQueryFetchData(queryFetchData + queryAdd);
  };
  const handleClearQueryFilter = () => {
    const firstIndexOfAmpersand = queryFetchData.indexOf("&");
    // Kiểm tra xem "&" đầu tiên có tồn tại trong URL hay không
    if (firstIndexOfAmpersand !== -1) {
      // Tìm vị trí của ký tự "&" thứ hai, bắt đầu từ vị trí sau "&" đầu tiên
      const secondIndexOfAmpersand = queryFetchData.indexOf(
        "&",
        firstIndexOfAmpersand + 1
      );

      // Kiểm tra xem "&" thứ hai có tồn tại trong URL hay không
      if (secondIndexOfAmpersand !== -1) {
        let newQuery = queryFetchData.slice(0, secondIndexOfAmpersand);
        setQueryFetchData(newQuery);
        setQueryFilter("");
      }
    }
  };
  const fetchDataBook = async () => {
    let res = await getAllBooksWithPaginate(queryFetchData);
    if (res && res.data) {
      setTotal(res?.data?.meta?.total);

      if (res.data && res.data.result) {
        let arrayData = [];

        arrayData = res.data.result.map((item, index) => {
          return {
            key: index,
            ID: item._id,
            Nameofbook: item.mainText,
            type: item.category,
            author: item.author,
            price: item.price,
            updatedAt: moment(item.updateAt).format("DD-MM-YYYY hh:mm:ss"),
            createdAt: moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss"),
            quantity: item.quantity,
            sold: item.sold,
            thumbnail: item.thumbnail,
            slider: item.slider,
          };
        });
        setDataSource(arrayData);
      }
    } else {
      console.log(res);
    }
  };

  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
    setQueryFetchData(
      `/book?current=${page}&pageSize=${pageSize}` + queryFilter
    );
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", sorter);
    //    if (sorter.order === "ascend") setSortedInfo(`${sorter.field}`);
    //    else if (sorter.order === "descend") setSortedInfo(`-${sorter.field}`);
    //    else setSortedInfo("");
  };

  const getValueCategory = async () => {
    let res = await getBookCategory();
    if (res && res.data) {
      setDataCategory(res.data);
    } else console.log(res);
  };
  useEffect(() => {
    fetchDataBook();
    getValueCategory();
  }, [current, pageSize, queryFetchData, queryFilter]);
  return (
    <>
      <InputSearchBook
        handleChangeQueryFilter={handleChangeQueryFilter}
        handleClearQueryFilter={handleClearQueryFilter}
      />
      <RenderHeaderTableBook
        fetchDataBook={fetchDataBook}
        openCreateBook={openCreateBook}
        setOpenCreateBook={setOpenCreateBook}
      />
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
      <BookDetailPage
        open={openBookDetail}
        setOpen={setOpenBookDetail}
        dataBookDetailPage={dataBookDetail}
        setDataBookDetailPage={setDataBookDetail}
      />
      <ModalCreateBook
        openModalCreateBook={openCreateBook}
        setOpenModalCreateBook={setOpenCreateBook}
        dataCategory={dataCategory}
        fetchDataBook={fetchDataBook}
      />
    </>
  );
};
export default TableBook;
