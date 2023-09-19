import { Button, Checkbox, Form, Input, message, notification } from "antd";
import React from "react";
import "../../assets/scss/Login.scss";
import { useNavigate } from "react-router-dom";
import Password from "antd/es/input/Password";
import { postLogin } from "../../apiService/apiServices.js";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/counter/accountSlice";

const Login = (props) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const onFinish = async (values) => {
    let res = await postLogin(values.Email, values.password);
    if (res?.data) {
      message.success("Login is successful!");
      localStorage.setItem("access_token", res.data.access_token);

      dispath(doLogin(res.data));
      navigate("/");
    } else {
      notification.error({
        message: "Login is failed!",
        description: res.message,
        duration: 5,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
                  message: "Please fill your email!",
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
                  message: "Please fill your password!",
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
                style={{ height: "40px" }}
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
