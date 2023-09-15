import { Tabs, Rate, Pagination } from "antd";
import "../../assets/scss/MainContent.scss";
import { useEffect, useState } from "react";
import { getAllBooksWithPaginate } from "../../apiService/apiServices";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const MainContent = (props) => {
  const items = [
    {
      key: "&sort=-sold",
      label: "Phổ biến",
      children: <></>,
    },
    {
      key: "&sort=updateAt",
      label: "Hàng mới",
      children: <></>,
    },
    {
      key: "&sort=price",
      label: "Giá cao đến thấp",
      children: <></>,
    },
    {
      key: "&sort=-price",
      label: "Giá thấp đến cao",
      children: <></>,
    },
  ];
  const { queryFilter, setQueryFilter, queryFilterPrice } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [queryFetchData, setQueryFetchData] = useState(
    `/book?current=${current}&pageSize=${pageSize}`
  );
  const [querySort, setQuerySort] = useState("&sort=-sold");
  const onChange = (key) => {
    setQuerySort(key);
  };
  const nagivate = useNavigate();
  const fetchDataBook = async () => {
    let res = await getAllBooksWithPaginate(
      queryFetchData + queryFilter + querySort + queryFilterPrice
    );
    if (res && res.data) {
      setTotal(res?.data?.meta?.total);

      if (res.data && res.data.result) {
        let arrayData = [];

        arrayData = res.data.result.map((item, index) => {
          return {
            key: index,
            ID: item._id,
            mainText: item.mainText,
            category: item.category,
            author: item.author,
            price: item.price,
            updatedAt: moment(item.updateAt).format("DD-MM-YYYY hh:mm:ss"),
            createdAt: moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss"),
            quantity: item.quantity,
            sold: item.sold,
            thumbnail: item.thumbnail,
            slider: item.slider,
          };
        });
        setDataSource(arrayData);
      }
    } else {
      console.log(res);
    }
  };
  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
    setQueryFetchData(`/book?current=${page}&pageSize=${pageSize}`);
  };
  useEffect(() => {
    fetchDataBook();
  }, [current, pageSize, queryFilter, querySort, queryFilterPrice]);
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRediectBookPage = (book) => {
    let result = convertSlug(book.mainText);
    nagivate(`/book/${result}?id=${book.ID}`);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        size="large"
      ></Tabs>
      <div className="containerBook">
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map((item, index) => {
            return (
              <div
                className="wrapper"
                onClick={() => handleRediectBookPage(item)}
              >
                <div className="thumbnail">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                      item.thumbnail
                    }`}
                  ></img>
                </div>
                <div className="text">{item.mainText}</div>
                <div className="rating">
                  <Rate
                    value={5}
                    disabled
                    style={{
                      color: "#ffce3d",
                      fontSize: 10,
                      padding: "5px",
                    }}
                  ></Rate>
                </div>
                <div className="price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                  <span>{item.sold}</span>
                </div>
              </div>
            );
          })}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          style={{ padding: "20px 0px 10px 0px" }}
          onChange={handleChangePage}
        ></Pagination>
      </div>
    </>
  );
};
export default MainContent;
