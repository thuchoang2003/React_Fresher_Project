import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { handleChangeInputSearch } = props;
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.fullName === undefined) values.fullName = "";
    if (values.email === undefined) values.email = "";
    if (values.phone === undefined) values.phone = "";
    handleChangeInputSearch(values.fullName, values.email, values.phone);
  };
  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`fullName`}
              label={`Name`}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`email`}
              label={`Email`}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`phone`}
              label={`Số điện thoại`}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
                handleChangeInputSearch("", "", "");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default InputSearch;
