import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Modal,
  notification,
} from "antd";
import { postCreateNewBook } from "../../../apiService/apiServices";
const ModalCreateBook = (props) => {
  const [form] = Form.useForm();
  const {
    openModalCreateBook,
    setOpenModalCreateBook,
    dataCategory,
    fetchDataBook,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values); // You can access form values here
        let data = {
          mainText: values.mainText,
          author: values.author,
          price: values.price,
          sold: values.sold,
          quantity: values.quantity,
          category: values.category,
        };
        let slider = [];
        if (values && values.upload && values.upload.length > 0) {
          values.upload.map((item, index) => {
            if (index === 0) {
              data.thumbnail = item.originFileObj?.name;
            } else {
              slider.push(item.originFileObj?.name);
            }
          });
        }
        data.slider = slider;
        //callAPI

        let res = await postCreateNewBook(data);
        if (res && res.data) {
          notification.success({
            message: "Success",
            description: "Create a new book successfully!",
            duration: 5,
          });
          fetchDataBook();
        } else {
          console.log(res);
        }
        form.resetFields();
        setOpenModalCreateBook(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModalCreateBook(false);
  };

  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Modal
        title="Tạo sách mới"
        open={openModalCreateBook}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => {
              setFormValues(values); // Update the state with form values
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Tên sách" name="mainText">
              <Input />
            </Form.Item>
            <Form.Item label="Tác giả" name="author">
              <Input />
            </Form.Item>
            <Form.Item label="Thể loại" name="category">
              <Select>
                {/* <Select.Option value="demo">Demo</Select.Option> */}
                {dataCategory &&
                  dataCategory.length > 0 &&
                  dataCategory.map((item) => {
                    return <Select.Option value={item}>{item}</Select.Option>;
                  })}
              </Select>
            </Form.Item>
            <Form.Item label="Giá" name="price">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Đã bán" name="sold">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Số lượng" name="quantity">
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="upload"
            >
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
};
export default ModalCreateBook;
