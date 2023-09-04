import React, { useState } from "react";
import { Button, Modal, message, Upload, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx/xlsx.mjs";

const ModalUploadFile = (props) => {
  const { openModalUploadFile, setOpenModalUploadFile } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [dataImportUser, setDataImportUser] = useState();
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModalUploadFile(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpenModalUploadFile(false);
  };
  const { Dragger } = Upload;
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 2000);
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest: dummyRequest,
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);

        const file = info.fileList[0].originFileObj;
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ["Fullname", "email", "phone"],
          range: 1,
        });
        setDataImportUser(jsonData);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title="Import data user"
        open={openModalUploadFile}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Only accept .csv .xls .xlsx
          </p>
        </Dragger>
        <TableDataUserUpload dataImportUser={dataImportUser} />
      </Modal>
    </>
  );
};

const TableDataUserUpload = (props) => {
  const { dataImportUser } = props;
  const columns = [
    {
      title: "Fullname",
      dataIndex: "Fullname",
      key: "Fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  return (
    <>
      <div style={{ margin: "15px 0px", fontSize: "16px" }}>
        Table data upload:
      </div>
      <Table dataSource={dataImportUser} columns={columns} />
    </>
  );
};

export default ModalUploadFile;
