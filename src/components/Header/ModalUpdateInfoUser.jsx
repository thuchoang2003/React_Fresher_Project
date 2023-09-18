import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Tabs,
  Row,
  Col,
  Avatar,
  Upload,
  Form,
  Input,
  notification,
} from "antd";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { uploadAvatarUser, putUpdateUser } from "../../apiService/apiServices";
import { doUpdateInfomation } from "../../redux/counter/accountSlice";
const ModalUpdateInfoUser = (props) => {
  const [form] = Form.useForm();
  const ModalUpdate = (props) => {
    const user = useSelector((state) => state.account.user);
    const avatar = useSelector((state) => state.account.user.avatar);
    const id = useSelector((state) => state.account.user.id);
    const [imgAvatar, setImgAvatar] = useState(
      `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`
    );
    const [avatarTmp, setAvatarTmp] = useState(avatar);
    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [initForm, setInitForm] = useState();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
      console.log("Success:", values);
      const { email, name, phone } = values;
      const res = await putUpdateUser(name, phone, avatarTmp, id);
      if (res && res.data) {
        notification.success({
          message: "Success",
          description: "Update information successfully!",
          duration: 5,
        });
        handleCancel();
        dispatch(
          doUpdateInfomation({
            avatar: avatarTmp,
            phone: phone,
            fullName: name,
          })
        );
      } else console.log("call error", res.data);
    };
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };
    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
      const res = await uploadAvatarUser(file);
      if (res && res.data) {
        setAvatarTmp(res.data.fileUploaded);
        setImgAvatar(res.data.fileUploaded);
        onSuccess("ok");
      } else {
        onError("Đã có lỗi khi upload file");
      }
    };
    const handleChangeAvatar = (info, type) => {
      if (info.file.status === "uploading") {
        type ? setLoadingSlider(true) : setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          type ? setLoadingSlider(false) : setLoading(false);
          setImgAvatar(url);
        });
      }
    };
    const fillData = () => {
      const init = {
        email: user.email,
        name: user.fullName,
        phone: user.phone,
      };

      form.setFieldsValue(init);
      setInitForm(init);
    };
    useEffect(() => {
      fillData();
    }, []);
    return (
      <>
        <Row span={24} gutter={[10, 10]}>
          <Col span={10}>
            <Row justify={"center"}>
              <Avatar span={24} size={150} src={imgAvatar} />
            </Row>
            <Row justify={"center"} style={{ padding: "10px 0px" }}>
              <Upload
                name={"avatar"}
                multiple={false}
                maxCount={1}
                span={24}
                onChange={handleChangeAvatar}
                customRequest={handleUploadAvatar}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </Row>
          </Col>
          <Col md={14}>
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Form.Item label="Email" name="email">
                <Input disabled value={user?.email}></Input>
              </Form.Item>
              <Form.Item
                label="Tên hiển thị"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input></Input>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  };
  const { isModalOpen, setIsModalOpen } = props;
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Cập nhật thông tin",
      children: (
        <>
          <ModalUpdate />
        </>
      ),
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: "Content of Tab Pane 2",
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Cập nhật thông tin cá nhân"
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        onOk={() => {
          form.submit();
        }}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </>
  );
};
export default ModalUpdateInfoUser;
