import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import "../../assets/scss/register.scss";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Register = (props) => {
  return (
    <>
      <div className="register-container">
        <div className="div-register">
          <div className="title">Đăng Ký</div>
          <hr />
          <Form
            layout="vertical"
            size="large"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              padding: "10px 0px",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              size="large"
              label="Fullname"
              name="Fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              size="large"
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              size="large"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item
              size="large"
              label="Telephone number"
              name="Telephone number"
              rules={[
                {
                  required: true,
                  message: "Please input your telephone number!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ height: "45px" }}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          <div className="div-Or">
            <span>OR</span>
          </div>
          <div className="register-footer">
            Bạn đã có tài khoản?
            <span onClick={() => navigate("/login")}>Đăng nhập ngay</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
