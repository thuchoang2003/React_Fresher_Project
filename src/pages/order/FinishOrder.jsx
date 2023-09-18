import React from "react";
import { Button, Result } from "antd";
const FinishOrder = (props) => {
  return (
    <>
      <Result
        status="success"
        title="Đã đặt hàng thành công"
        // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      />
    </>
  );
};
export default FinishOrder;
