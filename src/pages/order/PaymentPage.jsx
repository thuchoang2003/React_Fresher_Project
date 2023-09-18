import React from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Radio,
  Divider,
  notification,
  message,
} from "antd";
import { postCreateOrder } from "../../apiService/apiServices";
import { useDispatch } from "react-redux";
import { doFinishOrder } from "../../redux/counter/order/cartsSlice.js";
const { TextArea } = Input;
const PagementPage = (props) => {
  const { dataOrder, totalPrice, currentSteps, setCurrenSteps } = props;
  const [form] = Form.useForm();
  const dispath = useDispatch();
  const onFinish = async (values) => {
    const { name, phone, address, thanhtoan } = values;
    const detail = dataOrder.map((item, index) => {
      return {
        bookName: item.detail.dataBookDetail.mainText,
        quantity: item.quantity,
        _id: item.detail.dataBookDetail._id,
      };
    });
    const data = {
      name: name,
      address: address,
      phone: phone,
      totalPrice: totalPrice,
      detail: detail,
    };
    let res = await postCreateOrder(data);
    if (res && res.data) {
      notification.success({
        message: "Success",
        description: "Đã đặt hàng thành công",
        duration: 5,
      });
      dispath(doFinishOrder());
      setCurrenSteps(2);
    } else {
      notification.error({
        message: "Error",
        description: "Đặt hàng không thành công",
        duration: 5,
      });
    }
  };
  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên người nhận"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người nhận",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ nhận hàng ",
            },
            // You can add more validation rules here if needed
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Hình thức thanh toán" name="thanhtoan">
          <Radio.Group>
            <Radio value="0"> Thanh toán khi nhận hàng </Radio>
            <Radio value="1"> Thanh toán bằng MoMo</Radio>
          </Radio.Group>
        </Form.Item>
        <Divider></Divider>
        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "15px" }}>Tổng tiền</span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#fa502c",
              }}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </span>
          </div>
        </Form.Item>
        <Divider></Divider>
        <div>
          <Button
            danger
            style={{
              backgroundColor: "#fa502c",
              //       width: "200px",
              height: "40px",
              width: "100%",
            }}
            onClick={() => form.submit()}
          >
            <span style={{ color: "white" }}>
              Đặt hàng ({dataOrder.length})
            </span>
          </Button>
        </div>
      </Form>
    </>
  );
};
export default PagementPage;
