import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Radio,
  Space,
  Descriptions,
  Badge,
  Divider,
  Upload,
  Modal,
} from "antd";
import { v4 as uuidv4 } from "uuid";
const BookDetailPage = (props) => {
  const { open, setOpen, dataBookDetailPage, setDataBookDetailPage } = props;
  const onClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    console.log(dataBookDetailPage);
    if (dataBookDetailPage && dataBookDetailPage.thumbnail) {
      let imgThumnail = {
        uid: uuidv4(),
        name: dataBookDetailPage.thumbnail,
        status: "done",
        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataBookDetailPage.thumbnail
        }`,
      };

      if (dataBookDetailPage.slider && dataBookDetailPage.slider.length > 0) {
        let listImg = [];
        dataBookDetailPage.slider.map((item, index) => {
          listImg.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          });
        });
        setFileList([imgThumnail, ...listImg]);
      }
    }
  }, [dataBookDetailPage]);

  return (
    <>
      <Drawer
        title="Xem thông tin chi tiết sách"
        width={"50vw"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Descriptions title="Book detail information" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataBookDetailPage?.ID}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sách">
            {dataBookDetailPage?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">
            {dataBookDetailPage?.author}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại">
            {dataBookDetailPage?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Giá bán">
            {dataBookDetailPage?.price}
          </Descriptions.Item>
          <Descriptions.Item label="Đã bán">
            {dataBookDetailPage?.sold}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng">
            {dataBookDetailPage?.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="CreatedAt">
            {dataBookDetailPage?.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="UpdatedAt">
            {dataBookDetailPage?.updatedAt}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Picture</Divider>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Drawer>
    </>
  );
};

export default BookDetailPage;
