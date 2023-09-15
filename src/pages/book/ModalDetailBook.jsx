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
            <div>Title</div>
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
                        style={{ cursor: "pointer" }}
                        onClick={() => refGallery?.current?.slideToIndex(index)}
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
