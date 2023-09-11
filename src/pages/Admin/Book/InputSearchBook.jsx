import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
const InputSearchBook = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { handleChangeQueryFilter, handleClearQueryFilter } = props;
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let queryFilter = ``;
    if (values.Nameofbook !== undefined)
      queryFilter = `&mainText=/${values.Nameofbook}/i`;

    if (values.author !== undefined)
      queryFilter = queryFilter + `&author=/${values.author}/i`;

    if (values.type !== undefined)
      queryFilter = queryFilter + `&category=/${values.type}/i`;

    console.log(queryFilter);
    handleChangeQueryFilter(queryFilter);
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
              name={`Nameofbook`}
              label={`Tên sách`}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`author`}
              label={`Tác giả`}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name={`type`}
              label={`Thể loại`}
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

                handleClearQueryFilter();
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
export default InputSearchBook;
