import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  message,
} from "antd";
import { updateUser } from "../../apiService/apiServices.js";

const ModalUpdateUser = (props) => {
  const [form] = Form.useForm();
  const {
    openModalUpdateUser,
    setOpenModalUpdateUser,
    fetchDataUser,
    dataUpdateUser,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const fillDataUpdate = () => {
    console.log(dataUpdateUser);
    if (dataUpdateUser) {
      form.setFieldValue("fullname", dataUpdateUser.fullName);
      form.setFieldValue("email", dataUpdateUser.email);
      form.setFieldValue("phone", dataUpdateUser.phone);
    }
  };
  useEffect(() => {
    fillDataUpdate();
  }, [dataUpdateUser]);
  const callAPIUpdateUser = () => {};
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        await updateUser(dataUpdateUser.ID, values.fullname, values.phone);
        setOpenModalUpdateUser(false);
        fetchDataUser();
        notification.success({
          message: "Success",
          description: "Update user successfully!",
          duration: 5,
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModalUpdateUser(false);
  };

  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={openModalUpdateUser}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => {
            setFormValues(values); // Update the state with form values
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your fullname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled="true" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your telephone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
