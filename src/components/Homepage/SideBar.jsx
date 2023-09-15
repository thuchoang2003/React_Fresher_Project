import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ShopOutlined,
  SendOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "../../assets/scss/Sidebar.scss";
import { Button, Divider, InputNumber, Menu, Rate, notification } from "antd";
import { getBookCategory } from "../../apiService/apiServices";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SideBar = (props) => {
  const [items, setItems] = useState([]);
  const {
    queryFilter,
    setQueryFilter,
    setPriceTo,
    priceTo,
    priceFrom,
    setPriceFrom,
    setQueryFilterPrice,
  } = props;

  const listIcon = [
    <AppstoreOutlined />,
    <DesktopOutlined />,
    <MailOutlined />,
    <ContainerOutlined />,
    <AppstoreOutlined />,
    <PieChartOutlined />,
    <ShopOutlined />,
    <SendOutlined />,
    <ContainerOutlined />,
    <PieChartOutlined />,
  ];
  const fetchCategoryBook = async () => {
    let res = await getBookCategory();
    if (res && res.data) {
      let arrayItems;
      arrayItems = res.data?.map((item, index) => {
        return getItem(item, item, listIcon[index]);
      });
      setItems([getItem("All", "All", <MenuUnfoldOutlined />), ...arrayItems]);
    } else {
      console.log(res);
    }
  };
  const handleChangeMenu = (item, key, keyPath, domEvent) => {
    if (item.key === "All") setQueryFilter("");
    else {
      setQueryFilter(`&category=${item.key}`);
    }
  };
  useEffect(() => {
    fetchCategoryBook();
  }, []);
  return (
    <>
      <div className="div-sidebar">
        <div className="title_Sidebar">Danh mục</div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          items={items}
          onClick={handleChangeMenu}
        />
        <Divider orientation="center" orientationMargin={50}>
          Khoảng Giá
        </Divider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "5px 0px 20px 0px",
          }}
        >
          <InputNumber
            placeholder="đ Từ"
            onChange={(e) => {
              setPriceFrom(e);
            }}
            value={priceFrom}
          />{" "}
          <span>-</span>{" "}
          <InputNumber
            placeholder="đ Đến"
            onChange={(e) => {
              setPriceTo(e);
            }}
            value={priceTo}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{ width: "90%" }}
            onClick={() => {
              if (priceFrom >= 0 && priceTo > 0 && priceFrom <= priceTo) {
                setQueryFilterPrice(`&price>=${priceFrom}&price<=${priceTo}`);
              } else if (priceFrom === null && priceTo === null)
                setQueryFilterPrice("");
              else {
                notification.error({
                  message: "Error validate",
                  description: "Vui lòng kiểm tra giá tiền",
                  duration: 5,
                });
              }
            }}
          >
            Áp dụng
          </Button>
        </div>
        <Divider orientation="center" orientationMargin={10}>
          Đánh giá
        </Divider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            paddingLeft: "20px",
          }}
        >
          <Rate
            tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
            value={5}
          />
          <Rate
            tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
            value={4}
          />
          <Rate
            tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
            value={3}
          />
          <Rate
            tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
            value={2}
          />
          <Rate
            tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
            value={1}
          />
        </div>
      </div>
    </>
  );
};
export default SideBar;
