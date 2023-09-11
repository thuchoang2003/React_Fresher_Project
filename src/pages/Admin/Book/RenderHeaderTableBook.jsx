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
const RenderHeaderTableBook = (props) => {
  //   const {
  //     open,
  //     setOpenModalCreateUser,
  //     fetchDataUser,
  //     openModalUploadFile,
  //     setOpenModalUploadFile,
  //     dataSource,
  //   } = props;

  //   const handleExportData = () => {
  //     if (dataSource.length > 0) {
  //       const worksheet = XLSX.utils.json_to_sheet(dataSource);
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //       XLSX.writeFile(workbook, "DataExportUser.xlsx");
  //     }
  //   };
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
            //     onClick={() => {
            //       handleExportData();
            //     }}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<ImportOutlined />}
            //     onClick={() => {
            //       setOpenModalUploadFile(!openModalUploadFile);
            //     }}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            //     onClick={() => {
            //       setOpenModalCreateUser(!open);
            //     }}
          >
            Thêm mới
          </Button>
          <Button
            icon={<ReloadOutlined />}
            //     onClick={() => {
            //       fetchDataUser();
            //     }}
          />
        </div>
      </div>
    </>
  );
};
export default RenderHeaderTableBook;
