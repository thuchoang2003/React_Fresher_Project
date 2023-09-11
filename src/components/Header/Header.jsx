import {
  ShoppingCartOutlined,
  SearchOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Input, Badge, Button, Menu, Dropdown, Avatar } from "antd";
import "../../assets/scss/Header.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../redux/counter/accountSlice.js";
import { useDispatch } from "react-redux";
const { Search } = Input;

const onSearch = (value) => console.log(value);

const Header = () => {
  const isAuthenticated = useSelector((state) => state.account.user.id);
  const fullnameUser = useSelector((state) => state.account.user.fullName);
  const avatar = useSelector((state) => state.account.user.avatar);
  const avatarUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/images/avatar/${avatar}`;
  const navigate = useNavigate();
  const dispath = useDispatch();
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
    },
    {
      key: "4",
      label: <a>Đăng xuất</a>,
      onClick: () => {
        dispath(doLogout());
        navigate("/login");
      },
    },
  ];

  return (
    <>
      <div className="header-container container">
        <div className="div-logo">
          <img src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"></img>
        </div>
        <div className="div-search">
          <Search placeholder="Tìm kiếm" allowClear onSearch={onSearch} />
        </div>
        <div>
          <Button
            type="link"
            block
            size="large"
            icon={<HomeOutlined style={{ fontSize: "20px" }} />}
            style={{ fontSize: "17px" }}
          >
            Trang chủ
          </Button>
        </div>
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

        <div className="icon-cart">
          <Badge count={5}>
            <ShoppingCartOutlined
              style={{ fontSize: "25px", color: "#0060ff" }}
            />
          </Badge>
        </div>
      </div>
    </>
  );
};
export default Header;
