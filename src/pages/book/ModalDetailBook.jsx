import React, { useState } from "react";
import { Button, Modal, Row, Col, Image } from "antd";
import ImageGallery from "react-image-gallery";
const ModalDetailBook = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    images,
    refGallery,
    currentImage,
    setCurrentImage,
    dataBookDetail,
  } = props;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={900}
      >
        <Row gutter={[20, 20]}>
          <Col span={16}>
            <ImageGallery
              items={images}
              //       renderLeftNav={() => <></>}
              //       renderRightNav={() => <></>}
              showPlayButton={false}
              showFullscreenButton={false}
              //       onClick={() => handleClickImage()}
              //       slideToIndex={currentImage}
              startIndex={currentImage}
              onSlide={(index) => setCurrentImage(index)}
              showThumbnails={false}
              ref={refGallery}
            />
          </Col>
          <Col span={8}>
            <div
              style={{ fontSize: "20px", fontWeight: 200, padding: "20px 0px" }}
            >
              {dataBookDetail?.mainText}
            </div>
            <div>
              <Row gutter={[10, 10]}>
                {images?.map((item, index) => {
                  return (
                    <Col key={`image-${index}`}>
                      <Image
                        width={100}
                        height={100}
                        src={item.original}
                        preview={false}
                        style={{
                          cursor: "pointer",
                          border:
                            index === hoveredIndex
                              ? "2px solid rgba(2, 97, 255,0.6)"
                              : "1px solid",
                        }}
                        onClick={() => refGallery?.current?.slideToIndex(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      ></Image>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalDetailBook;
