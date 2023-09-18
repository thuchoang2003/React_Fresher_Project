import {
  Row,
  Col,
  Image,
  InputNumber,
  Divider,
  Button,
  Empty,
  Steps,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doUpdateCart,
  doDeleteBook,
} from "../../redux/counter/order/cartsSlice.js";
import PagementPage from "./PaymentPage.jsx";
import FinishOrder from "./FinishOrder.jsx";
import { store } from "../../redux/store.js";

const OrderPage = (props) => {
  const [dataOrder, setDataOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentSteps, setCurrenSteps] = useState(0);
  let dispatch = useDispatch();
  // let carts = useSelector((state) => state.carts.orders);
  const fetchDataOrders = () => {
    console.log("check", store.getState());
    let carts = store.getState().carts.orders;
    if (carts && carts.length > 0) {
      let sum = 0; // Initialize sum to 0
      carts.map((item) => {
        sum += item.quantity * item.detail?.dataBookDetail?.price;
      });
      setDataOrder(carts);
      setTotalPrice(sum);
    }
  };
  const handleChangeQuantity = (item, value) => {
    if (item) {
      dispatch(
        doUpdateCart({
          _id: item.detail.dataBookDetail._id,
          quantity: value,
        })
      );
      fetchDataOrders();
    }
  };
  const handleDeleteItemOrder = (item) => {
    if (item) {
      dispatch(
        doDeleteBook({
          _id: item.detail.dataBookDetail._id,
        })
      );
      const newArray = dataOrder.filter(
        (item) =>
          item.detail.dataBookDetail._id !== item.detail.dataBookDetail._id
      );
      setDataOrder(newArray);
    }
  };
  useEffect(() => {
    fetchDataOrders();
  }, [dataOrder, totalPrice, currentSteps]);
  return (
    <>
      <div
        className="divOrderPage"
        style={{
          backgroundColor: "#f7f7f8",
          padding: "10px 0px",
        }}
      >
        <div>
          <Row
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              backgroundColor: "white",
              padding: "20px 10px",
              borderRadius: "10px",
            }}
          >
            <Steps
              size="default"
              current={currentSteps}
              items={[
                {
                  title: "Đơn hàng",
                },
                {
                  title: "Đặt hàng",
                },
                {
                  title: "Thanh toán",
                },
              ]}
            />
          </Row>
          {currentSteps === 2 && <FinishOrder />}
          {currentSteps !== 2 && (
            <Row
              gutter={[20, 20]}
              style={{
                maxWidth: "1440px",
                margin: "0 auto",
                backgroundColor: "#f7f7f8",
              }}
            >
              <Col md={16} sm={24} xs={24} align={"center"}>
                {dataOrder &&
                  dataOrder.length > 0 &&
                  dataOrder.map((item, index) => {
                    return (
                      <Row
                        md={24}
                        sm={24}
                        xs={24}
                        gutter={[20, 20]}
                        align={"middle"}
                        style={{
                          padding: "10px 0px",
                          backgroundColor: "white",
                          borderRadius: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <Col md={2} sm={2} xs={2}>
                          <Image
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/book/${
                              item.detail.dataBookDetail.thumbnail
                            }`}
                            width={70}
                            height={70}
                          ></Image>
                        </Col>
                        <Col md={8} sm={8} xs={8}>
                          {item.detail.dataBookDetail.mainText}
                        </Col>
                        <Col md={2} sm={2} xs={2}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.detail.dataBookDetail.price)}
                        </Col>
                        <Col md={3} sm={2} xs={2} offset={1}>
                          <InputNumber
                            value={item.quantity}
                            onChange={(value) =>
                              handleChangeQuantity(item, value)
                            }
                          />
                        </Col>
                        <Col md={4} sm={5} xs={5} offset={2}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                lineHeight: "100%",
                                margin: "0px 2px 0px 0px",
                                fontSize: "15px",
                              }}
                            >
                              Tổng:{" "}
                            </span>
                            <span
                              style={{
                                lineHeight: "100%",
                                fontSize: "15px",
                              }}
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(
                                +item.detail.dataBookDetail.price *
                                  +item.quantity
                              )}
                            </span>
                          </div>
                        </Col>
                        <Col span={2}>
                          <DeleteOutlined
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: "16px",
                            }}
                            onClick={() => handleDeleteItemOrder(item)}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                {dataOrder.length === 0 && <Empty></Empty>}
              </Col>
              <Col
                md={6}
                sm={23}
                xs={23}
                offset={1}
                style={{
                  padding: "30px 0px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginTop: "10px",
                  height: "fit-content",
                }}
              >
                {" "}
                <Col span={24}>
                  {currentSteps === 0 && (
                    <>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "15px" }}>Tạm Tính</span>
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice)}
                        </span>
                      </div>
                      <Divider />
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
                      <Divider />
                      <div>
                        <Button
                          danger
                          style={{
                            backgroundColor: "#fa502c",
                            //       width: "200px",
                            height: "40px",
                            width: "100%",
                          }}
                          onClick={() => setCurrenSteps(1)}
                        >
                          <span style={{ color: "white" }}>
                            Mua Hàng ({dataOrder.length})
                          </span>
                        </Button>
                      </div>
                    </>
                  )}

                  {currentSteps === 1 && (
                    <PagementPage
                      dataOrder={dataOrder}
                      totalPrice={totalPrice}
                      currentSteps={currentSteps}
                      setCurrenSteps={setCurrenSteps}
                    ></PagementPage>
                  )}
                </Col>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
};
export default OrderPage;
