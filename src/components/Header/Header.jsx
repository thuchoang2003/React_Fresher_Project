import {
  AudioOutlined,
  HomeOutlined,
  SmileOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React from "react";
import { Input, Space, Badge } from "antd";
import "../../assets/scss/Header.scss";
const { Search } = Input;

const onSearch = (value) => console.log(value);
const Header = (props) => {
  return (
    <>
      <div className="header-container container">
        <div className="div-logo">
          <img src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"></img>
        </div>
        <div className="div-search">
          <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={onSearch}
            style={{ width: 1000, height: 50 }}
            size="large"
          />
        </div>
        <div className="header-right">
          <div className="home-icon">
            <HomeOutlined style={{ fontSize: "35px", color: "#0060ff" }} />
            <span>Trang chủ</span>
          </div>
          <div className="account-icon">
            <SmileOutlined style={{ fontSize: "35px", color: "#81818a" }} />
            <span>Tài khoản</span>
          </div>
        </div>
        <div className="icon-seperate"></div>
        <div className="icon-cart">
          <Badge count={5}>
            <ShoppingCartOutlined
              style={{ fontSize: "35px", color: "#0060ff" }}
            />
          </Badge>
        </div>
      </div>
    </>
  );
};
export default Header;
