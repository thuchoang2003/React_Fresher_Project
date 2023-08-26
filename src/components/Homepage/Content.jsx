import "../../assets/scss/ContentHomepage.scss";
import { Carousel } from "antd";
import {
  CheckCircleOutlined,
  UserAddOutlined,
  AmazonOutlined,
} from "@ant-design/icons";

const Content = (props) => {
  return (
    <div className="div-content-homepage">
      <div className="content-first">
        <div className="content-first__left">
          <Carousel autoplay>
            <div className="div-img-content">
              <img
                src="https://salt.tikicdn.com/ts/tikimsp/81/69/28/a1b6a0cbd3112d02b145d0fea51b51b8.png"
                alt=""
              />
            </div>
            <div className="div-img-content">
              <img src="https://salt.tikicdn.com/ts/tikimsp/9f/3d/fd/1f7513ef051f50bb981d0e7e351a6f72.png"></img>
            </div>
            <div className="div-img-content">
              <img src="https://salt.tikicdn.com/ts/tikimsp/b2/be/10/cdd768cace90cb210e6eff0e6110f99b.png"></img>
            </div>
            <div className="div-img-content">
              <img src="https://salt.tikicdn.com/ts/tikimsp/7b/b3/ef/624b9e9238e25f7930f5ad8789d4e492.png"></img>
            </div>
          </Carousel>
        </div>
        <div className="content-first__right">
          <img
            src="https://salt.tikicdn.com/ts/tikimsp/61/35/3d/90e7dfbaa9a9b63771f0d063f7f5f5e2.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="content-second">
        <div className="content-second__item">
          <CheckCircleOutlined />
          <span className="title">100% chính hãng</span>
        </div>
        <div className="content-second__item">
          <UserAddOutlined />
          <span className="title">Trợ lý cá nhân</span>
        </div>
        <div className="content-second__item">
          <AmazonOutlined />
          <span className="title">Giao nhanh & đúng hẹn</span>
        </div>
      </div>
      <div className="content-three"></div>
    </div>
  );
};
export default Content;
