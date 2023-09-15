import "../../assets/scss/ContentHomepage.scss";
import { Carousel, Row, Col } from "antd";
import {
  CheckCircleOutlined,
  UserAddOutlined,
  AmazonOutlined,
} from "@ant-design/icons";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import { useState } from "react";

const Content = (props) => {
  const [queryFilter, setQueryFilter] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState();
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col md={4} sm={0} xs={0}>
          <SideBar
            queryFilter={queryFilter}
            setQueryFilter={setQueryFilter}
            priceFrom={priceFrom}
            setPriceFrom={setPriceFrom}
            priceTo={priceTo}
            setPriceTo={setPriceTo}
            setQueryFilterPrice={setQueryFilterPrice}
          />
        </Col>
        <Col md={20} sm={24} xs={24}>
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

            <div
              className="content-three"
              style={{
                padding: "10px",
                boxShadow: "2px 2px 10px 5px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <MainContent
                queryFilter={queryFilter}
                setQueryFilter={queryFilter}
                queryFilterPrice={queryFilterPrice}
              ></MainContent>
            </div>
          </div>
        </Col>
      </Row>
      {/* <SideBar
        queryFilter={queryFilter}
        setQueryFilter={setQueryFilter}
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        setQueryFilterPrice={setQueryFilterPrice}
      />
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

        <div
          className="content-three"
          style={{
            padding: "10px",
            boxShadow: "2px 2px 10px 5px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <MainContent
            queryFilter={queryFilter}
            setQueryFilter={queryFilter}
            queryFilterPrice={queryFilterPrice}
          ></MainContent>
        </div>
      </div> */}
    </>
  );
};
export default Content;
