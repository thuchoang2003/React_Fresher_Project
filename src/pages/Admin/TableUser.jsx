import React, { useEffect, useState } from "react";
import { Table, theme, Button } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { getUsersWithPaginate } from "../../apiService/apiServices.js";
import { useImmer } from "use-immer";
import InputSearch from "./InputSearch";
import UserDetailPage from "./UserDetailPage.jsx";
import ModalCreateUser from "./ModalCreateUser.jsx";
import ModalUploadFile from "./ModalUploadFile.jsx";

const RenderHeaderTableUser = (props) => {
  const {
    open,
    setOpenModalCreateUser,
    fetchDataUser,
    openModalUploadFile,
    setOpenModalUploadFile,
  } = props;
  return (
    <>
      <div
        className="headerTableUser"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "15px",
          marginRight: "20px",
        }}
      >
        <div className="div-btn" style={{ display: "flex", gap: "7px" }}>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export
          </Button>
          <Button
            type="primary"
            icon={<ImportOutlined />}
            onClick={() => {
              setOpenModalUploadFile(!openModalUploadFile);
            }}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCreateUser(!open);
            }}
          >
            Thêm mới
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              fetchDataUser();
            }}
          />
        </div>
      </div>
    </>
  );
};
const TableUser = (props) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useImmer([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sortedInfo, setSortedInfo] = useState("");
  const [openUserDetail, setOpenUserDetail] = useState(false);
  const [dataUserDetail, setDataUserDetail] = useState();
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
  const [openModalUploadFile, setOpenModalUploadFile] = useState(false);
  const handleChangeInputSearch = (fullname, email, phone) => {
    setFullname(fullname);
    setEmail(email);
    setPhone(phone);
  };
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
            onClick={() => {
              setOpenUserDetail(!openUserDetail);
              setDataUserDetail(record);
            }}
          >
            {record.ID}
          </a>
        );
      },
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
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
    let res = await getUsersWithPaginate(
      current,
      pageSize,
      fullname,
      email,
      phone,
      sortedInfo
    );

    if (res && res.data) {
      setTotal(res?.data?.meta?.total);
      if (res.data && res.data.result) {
        let arrayData = [];
        arrayData = res.data.result.map((item, index) => {
          return {
            key: index,
            ID: item._id,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone,
            role: item.role,
            active: item.isActive ? "True" : "False",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });
        setDataSource(arrayData);
      }
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [current, pageSize, fullname, email, phone, sortedInfo]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", sorter);
    if (sorter.order === "ascend") setSortedInfo(`${sorter.field}`);
    else if (sorter.order === "descend") setSortedInfo(`-${sorter.field}`);
    else setSortedInfo("");
  };
  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <InputSearch handleChangeInputSearch={handleChangeInputSearch} />
      <RenderHeaderTableUser
        open={openModalCreateUser}
        setOpenModalCreateUser={setOpenModalCreateUser}
        fetchDataUser={fetchDataUser}
        openModalUploadFile={openModalUploadFile}
        setOpenModalUploadFile={setOpenModalUploadFile}
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

      <UserDetailPage
        open={openUserDetail}
        setOpen={setOpenUserDetail}
        dataUserDetailPage={dataUserDetail}
        setDataUserDetailPage={setDataUserDetail}
      />
      <ModalCreateUser
        open={openModalCreateUser}
        setOpenModalCreateUser={setOpenModalCreateUser}
        fetchDataUser={fetchDataUser}
      />
      <ModalUploadFile
        openModalUploadFile={openModalUploadFile}
        setOpenModalUploadFile={setOpenModalUploadFile}
      />
    </>
  );
};
export default TableUser;
