import React, { useEffect, useState } from "react";
import { Table, theme, Button, notification } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  getUsersWithPaginate,
  deleteUser,
} from "../../apiService/apiServices.js";
import { useImmer } from "use-immer";
import InputSearch from "./InputSearch";
import UserDetailPage from "./UserDetailPage.jsx";
import ModalCreateUser from "./ModalCreateUser.jsx";
import ModalUploadFile from "./ModalUploadFile.jsx";
import * as XLSX from "xlsx";
import ModalUpdateUser from "./ModalUpdateUser.jsx";

const RenderHeaderTableUser = (props) => {
  const {
    open,
    setOpenModalCreateUser,
    fetchDataUser,
    openModalUploadFile,
    setOpenModalUploadFile,
    dataSource,
  } = props;

  const handleExportData = () => {
    if (dataSource.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(dataSource);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "DataExportUser.xlsx");
    }
  };
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
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              handleExportData();
            }}
          >
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
  const [pageSize, setPageSize] = useState(7);
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
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState();
  const handleChangeInputSearch = (fullname, email, phone) => {
    setFullname(fullname);
    setEmail(email);
    setPhone(phone);
  };
  const handleDeleteUser = async (id) => {
    let res = await deleteUser(id);
    if (res && res.data) {
      notification.success({
        message: "Success",
        description: "Delete user successfully!",
        duration: 5,
      });
      fetchDataUser();
    } else {
      console.log(res);
    }
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
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record, index) => {
        return (
          <div>
            <Button
              icon={
                <DeleteOutlined style={{ color: "red", fontSize: "17px" }} />
              }
              type="text"
              onClick={() => {
                handleDeleteUser(record.ID);
              }}
            ></Button>
            <Button
              icon={<EditOutlined style={{ fontSize: "17px" }} />}
              type="text"
              onClick={() => {
                setOpenModalUpdateUser(!openModalUpdateUser);
                setDataUpdateUser(record);
              }}
            ></Button>
          </div>
        );
      },
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
        dataSource={dataSource}
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
        fetchDataUser={fetchDataUser}
      />
      <ModalUpdateUser
        openModalUpdateUser={openModalUpdateUser}
        setOpenModalUpdateUser={setOpenModalUpdateUser}
        fetchDataUser={fetchDataUser}
        dataUpdateUser={dataUpdateUser}
      />
    </>
  );
};
export default TableUser;
