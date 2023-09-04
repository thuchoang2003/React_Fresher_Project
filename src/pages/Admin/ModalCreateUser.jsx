import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  message,
} from "antd";
import { postNewUser } from "../../apiService/apiServices.js";
const ModalCreateUser = (props) => {
  const [form] = Form.useForm();
  const { open, setOpenModalCreateUser } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const callAPIAddUser = async (fullName, password, email, phone) => {
    let response = await postNewUser(fullName, password, email, phone);
    if (response && response.data) {
      message.success("Create new user successfull!");
      await fetchDataUser();
    } else {
      console.log(response.message);
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        await callAPIAddUser(
          values.fullname,
          values.password,
          values.email,
          values.phone
        );
        setOpenModalCreateUser(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModalCreateUser(false);
  };

  return (
    <>
      <Modal
        title="Tạo tài khoản người dùng mới"
        open={open}
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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your telephone number!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
