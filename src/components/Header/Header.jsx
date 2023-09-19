import {
  ShoppingCartOutlined,
  SearchOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Input,
  Badge,
  Button,
  Menu,
  Dropdown,
  Avatar,
  Row,
  Col,
  Divider,
  Image,
} from "antd";
import "../../assets/scss/Header.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../redux/counter/accountSlice.js";
import { useDispatch } from "react-redux";
import ModalUpdateInfoUser from "./ModalUpdateInfoUser";
const { Search } = Input;

const Header = (props) => {
  const isAuthenticated = useSelector((state) => state.account.user.id);
  const fullnameUser = useSelector((state) => state.account.user.fullName);
  const avatar = useSelector((state) => state.account.user.avatar);
  let carts = useSelector((state) => state.carts.orders);
  const avatarUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/images/avatar/${avatar}`;

  const countOrder = useSelector((state) => state.carts.orders.length);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [openModalUpdateInfoUser, setOpenModalUpdateInfoUser] = useState(false);
  const { searchTerm, setSearchTerm } = props;
  const itemsNotLogin = [
    {
      key: "1",
      label: <a>Đăng Nhập</a>,
      onClick: () => {
        navigate("/login");
      },
    },
    {
      key: "2",
      label: <a>Đăng ký</a>,
      onClick: () => {
        navigate("/register");
      },
    },
  ];
  const itemsLogin = [
    {
      key: "3",
      label: <a>Quản lý trang cá nhân</a>,
      onClick: () => {
        setOpenModalUpdateInfoUser(!openModalUpdateInfoUser);
      },
    },
    {
      key: "4",
      label: <a>Đăng xuất</a>,
      onClick: () => {
        dispath(doLogout());
        navigate("/login");
      },
    },
    {
      key: "5",
      label: <a>Lịch sử mua hàng</a>,
      onClick: () => {
        navigate("/history");
      },
    },
  ];

  const [itemCarts, setItemCarts] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) return;
    let arrayOrdersClone = carts.map((item, index) => {
      return {
        key: `${item.detail.dataBookDetail._id}`,
        label: (
          <Row
            gutter={[10, 10]}
            justify="center"
            style={{ margin: 0, padding: 0 }}
          >
            <Col span={4}>
              <Image
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                  item.detail.dataBookDetail.thumbnail
                }`}
                width={60}
                height={50}
              ></Image>
            </Col>
            <Col span={10} offset={1}>
              <span style={{ fontSize: "15px" }}>
                {item.detail.dataBookDetail.mainText}
              </span>
            </Col>
            <Col span={4} offset={1}>
              <span style={{ fontSize: "15px", color: "#fc634d" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.detail.dataBookDetail.price)}
              </span>
            </Col>
          </Row>
        ),
      };
    });
    arrayOrdersClone = arrayOrdersClone.reverse();
    if (arrayOrdersClone.length > 0) {
      arrayOrdersClone.push({
        key: `btnShowCarts`,
        label: (
          <Row justify="end" span={24}>
            <Col span={8}>
              <Button
                danger
                style={{
                  backgroundColor: "#d0011b",
                  height: "30px",
                }}
              >
                <span
                  style={{ color: "white" }}
                  onClick={() => navigate("/order")}
                >
                  Xem Giỏ Hàng
                </span>
              </Button>
            </Col>
          </Row>
        ),
      });
    }

    setItemCarts(arrayOrdersClone);
  }, [countOrder]);
  const onSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <>
      <div className="header-container container">
        {/* <Row gutter={[20, 20]}> */}
        <Col md={3} sm={3} xs={0}>
          <div className="div-logo">
            <img src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"></img>
          </div>
        </Col>
        <Col md={12} sm={12} xs={18}>
          <Search
            span={24}
            placeholder="Search"
            allowClear
            onSearch={onSearch}
            style={{
              width: "100%",
            }}
            size="large"
          />
        </Col>
        <Col md={3} sm={0} xs={0}>
          <div>
            <Button
              type="link"
              block
              size="large"
              icon={<HomeOutlined style={{ fontSize: "20px" }} />}
              style={{ fontSize: "17px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Trang chủ
            </Button>
          </div>
        </Col>
        <Col md={3} sm={0} xs={0}>
          {isAuthenticated ? (
            <div>
              <Dropdown
                menu={{ items: itemsLogin }}
                placement="bottom"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button
                  icon={<Avatar size={27} src={avatarUrl} />}
                  size="large"
                  type="link"
                  block
                  style={{
                    fontSize: "17px",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {fullnameUser}
                </Button>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Dropdown
                menu={{ items: itemsNotLogin }}
                placement="bottom"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button
                  icon={<UserOutlined style={{ fontSize: "17px" }} />}
                  size="large"
                  type="link"
                  block
                  style={{ fontSize: "17px" }}
                >
                  Tài khoản
                </Button>
              </Dropdown>
            </div>
          )}
        </Col>

        <Col md={1} sm={2} xs={3}>
          <div className="icon-cart">
            <Dropdown
              menu={{ items: itemCarts }}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
              autoAdjustOverflow={true}
              justify="space-evenly"
              // style={{ width: "100px" }}
            >
              <Badge count={isAuthenticated ? countOrder : 0}>
                <ShoppingCartOutlined
                  style={{ fontSize: "25px", color: "#0060ff" }}
                />
              </Badge>
            </Dropdown>
          </div>
        </Col>
        {/* </Row> */}
      </div>
      <ModalUpdateInfoUser
        isModalOpen={openModalUpdateInfoUser}
        setIsModalOpen={setOpenModalUpdateInfoUser}
      />
    </>
  );
};
export default Header;
