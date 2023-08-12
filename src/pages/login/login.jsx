import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import "../../assets/scss/Login.scss";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        <div className="div-login">
          <div className="title">Đăng Nhập</div>
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
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="div-Or">
            <span>OR</span>
          </div>
          <div className="login-footer">
            Bạn chưa có tài khoản?
            <span onClick={() => navigate("/register")}>Đăng ký ngay</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
