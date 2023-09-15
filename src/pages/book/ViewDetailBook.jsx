import "../../assets/scss/ViewDetailBook.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import React, { useEffect, useRef, useState } from "react";
import { Rate, Row, Col, Divider, Button, InputNumber } from "antd";
import { getDetailBookWithId } from "../../apiService/apiServices";
import { useLocation } from "react-router-dom";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ModalDetailBook from "./ModalDetailBook";
import BookLoader from "./BookLoader";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const ViewDetailBook = (props) => {
  //   let images = [
  //     //     {
  //     //       original: "https://picsum.photos/id/1018/1000/600/",
  //     //       thumbnail: "https://picsum.photos/id/1018/250/150/",
  //     //     },
  //     //     {
  //     //       original: "https://picsum.photos/id/1015/1000/600/",
  //     //       thumbnail: "https://picsum.photos/id/1015/250/150/",
  //     //     },
  //     //     {
  //     //       original: "https://picsum.photos/id/1019/1000/600/",
  //     //       thumbnail: "https://picsum.photos/id/1019/250/150/",
  //     //     },
  //     //     {
  //     //       original: "https://picsum.photos/id/1018/1000/600/",
  //     //       thumbnail: "https://picsum.photos/id/1018/250/150/",
  //     //     },
  //     //     {
  //     //       original: "https://picsum.photos/id/1015/1000/600/",
  //     //       thumbnail: "https://picsum.photos/id/1015/250/150/",
  //     //     },
  //     //     {
  //     //       original: "https://picsum.photos/id/1019/1000/600/",
  //     //       thumbnail: "https://picsum.photos/id/1019/250/150/",
  //     //     },
  //   ];
  const [images, setImages] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [dataBookDetail, setDataBookDetail] = useState();

  const handleClickImage = () => {
    setOpenModal(!openModal);
    console.log(refGallery?.current?.getCurrentIndex());
    setCurrentImage(refGallery?.current?.getCurrentIndex());
  };
  const refGallery = useRef();
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");

  const getImage = (data) => {
    let image = [];
    const imgThumbnail = {
      original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
        data.thumbnail
      }`,
      thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
        data.thumbnail
      }`,
      //       originalClass: "originalClass",
      //       thumbnailClass: "thumbnailClass",
    };
    image.push(imgThumbnail);
    data.slider.map((item, index) => {
      image.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        // originalClass: "originalClass",
        // thumbnailClass: "thumbnailClass",
      });
    });
    return image;
    console.log(images);
    console.log("check imgThumbnail", imgThumbnail);
  };
  const fetchDataBook = async (id) => {
    if (id) {
      let res = await getDetailBookWithId(id);
      if (res && res.data) {
        setImages(getImage(res.data));
        setTimeout(() => {
          setDataBookDetail(res.data);
        }, 2000);
      } else {
        console.log(res);
      }
    }
  };
  useEffect(() => {
    fetchDataBook(id);
  }, [id]);
  return (
    <>
      {dataBookDetail && dataBookDetail._id ? (
        <div
          className="DetailBookContainer"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            minHeight: "calc(100vh - 150px)",
            padding: "10px 20px",
            backgroundColor: "#f7f7f8",
          }}
        >
          <div style={{ backgroundColor: "white" }}>
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0} style={{ cursor: "pointer" }}>
                <ImageGallery
                  ref={refGallery}
                  items={images}
                  renderLeftNav={() => <></>}
                  renderRightNav={() => <></>}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  onClick={() => handleClickImage()}
                />
              </Col>
              <Col md={14} sm={24}>
                <Col md={0} sm={24} xs={24}>
                  <ImageGallery items={images} />
                </Col>
                <Col span={24}>
                  <div className="div-author">
                    <span>Tác giả:</span>{" "}
                    <a href="#">{dataBookDetail.author}</a>
                  </div>
                  <div className="text">{dataBookDetail.mainText}</div>
                  <div className="divRating">
                    <Rate value={5} disabled></Rate>
                    <Divider type="vertical"></Divider>
                    <span className="divRating__sold">
                      {dataBookDetail.sold}
                    </span>
                  </div>
                  <div className="divPrice">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(dataBookDetail.price)}
                  </div>
                  <div className="divDelivery">
                    <span className="divDelivery_left">Vận chuyển:</span>
                    <span className="divDelivery_right">
                      Miễn phí vận chuyển
                    </span>
                  </div>
                  <div className="divQuantity">
                    <span className="divQuantity_left">Số lượng:</span>
                    <span className="divQuantity_right">
                      <Button icon={<MinusOutlined />}></Button>
                      <InputNumber defaultValue={1} />
                      <Button icon={<PlusOutlined />}></Button>
                    </span>
                  </div>
                  <div className="divBtnAddBook">
                    <Button
                      icon={
                        <ShoppingCartOutlined
                          style={{ fontSize: "20px", color: "#d0011b" }}
                        />
                      }
                      style={{
                        borderColor: "#d0011b",
                        backgroundColor: "#fbebed",
                        //       width: "200px",
                        height: "40px",
                      }}
                    >
                      <span className="text">Thêm Vào Giỏ Hàng</span>
                    </Button>
                    <Button
                      danger
                      style={{
                        backgroundColor: "#d0011b",
                        //       width: "200px",
                        height: "40px",
                      }}
                    >
                      <span className="text2">Mua Ngay</span>
                    </Button>
                  </div>
                </Col>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <BookLoader />
      )}

      <ModalDetailBook
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        refGallery={refGallery}
      />
    </>
  );
};
export default ViewDetailBook;
