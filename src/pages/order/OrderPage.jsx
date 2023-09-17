import { Row, Col, Image, InputNumber, Divider, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const OrderPage = (props) => {
  const [dataOrder, setDataOrder] = useState([]);
  let carts = useSelector((state) => state.carts.orders);
  const fetchDataOrders = () => {
    setDataOrder(carts);
  };
  useEffect(() => {
    fetchDataOrders();
  }, [dataOrder]);
  return (
    <>
      <div
        className="divOrderPage"
        style={{
          backgroundColor: "#bdbdbd",
          padding: "10px 0px",
        }}
      >
        <div>
          <Row
            gutter={[20, 20]}
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              backgroundColor: "#bdbdbd",
            }}
          >
            <Col md={16} sm={16} xs={16} align={"center"}>
              {/* <Row
                span={24}
                gutter={[20, 20]}
                align={"middle"}
                style={{
                  padding: "10px 0px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <Col span={2}>
                  <Image src="#" width={70} height={70}></Image>
                </Col>
                <Col span={8}>Diary Of A Wimpy Kid 09: The Long Haul</Col>
                <Col span={2}>12312311</Col>
                <Col span={2}>
                  <InputNumber />
                </Col>
                <Col span={6} offset={2}>
                  Tổng: 696.000
                </Col>
                <Col span={2}>
                  <DeleteOutlined />
                </Col>
              </Row>
              <Row
                span={24}
                gutter={[20, 20]}
                align={"middle"}
                style={{
                  padding: "10px 0px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <Col span={2}>
                  <Image src="#" width={70} height={70}></Image>
                </Col>
                <Col span={8}>Diary Of A Wimpy Kid 09: The Long Haul</Col>
                <Col span={2}>12312311</Col>
                <Col span={2}>
                  <InputNumber />
                </Col>
                <Col span={6} offset={2}>
                  Tổng: 696.000
                </Col>
                <Col span={2}>
                  <DeleteOutlined />
                </Col>
              </Row> */}
              {dataOrder &&
                dataOrder.length > 0 &&
                dataOrder.map((item, index) => {
                  return (
                    <Row
                      span={24}
                      gutter={[20, 20]}
                      align={"middle"}
                      style={{
                        padding: "10px 0px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <Col span={2}>
                        <Image src="#" width={70} height={70}></Image>
                      </Col>
                      <Col span={8}>{item.detail.dataBookDetail.mainText}</Col>
                      <Col span={2}>{item.detail.dataBookDetail.price}</Col>
                      <Col span={2}>
                        <InputNumber value={item.quantity} />
                      </Col>
                      <Col span={6} offset={2}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "cen",
                          }}
                        >
                          <span
                            style={{
                              lineHeight: "100%",
                              margin: "0px 2px 0px 0px",
                            }}
                          >
                            Tổng:{" "}
                          </span>
                          <span>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              +item.detail.dataBookDetail.price * +item.quantity
                            )}
                          </span>
                        </div>
                      </Col>
                      <Col span={2}>
                        <DeleteOutlined />
                      </Col>
                    </Row>
                  );
                })}
            </Col>
            <Col
              md={6}
              sm={8}
              xs={8}
              offset={1}
              style={{
                padding: "10px 0px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              {" "}
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "15px" }}>Tạm Tính</span>
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    1000000
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
                    1000000
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
                  >
                    <span style={{ color: "white" }}>Mua Hàng ({2})</span>
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default OrderPage;
