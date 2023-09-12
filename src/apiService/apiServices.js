import instance from "../utils/customizeAxios";
const postLogin = (email, password) => {
  const data = {
    username: email,
    password: password,
  };
  let response = instance.post("auth/login", data);
  return response;
};
const postRegister = (fullname, email, password, phone) => {
  const data = {
    fullName: fullname,
    email: email,
    password: password,
    phone: phone,
  };
  let response = instance.post("user/register", data);
  return response;
};
const fetchAccount = () => {
  return instance.get("/auth/account");
};
const postLogout = () => {
  let response = instance.post("/auth/logout");
  return response;
};
// const getUsersWithPaginate = (query) => {
//   let response = instance.get(query);
//   return response;
// };
const getUsersWithPaginate = (
  current,
  pageSize,
  fullName,
  email,
  phone,
  sortType
) => {
  let response = instance.get(
    `/user?current=${current}&pageSize=${pageSize}&fullName=/${fullName}/&email=/${email}/&phone=/${phone}/&sort=${sortType}`
  );
  return response;
};
const postNewUser = (fullName, password, email, phone) => {
  const data = {
    fullName: fullName,
    password: password,
    email: email,
    phone: phone,
  };
  let response = instance.post("/user", data);
  return response;
};
const postListUser = (data) => {
  let response = instance.post("/user/bulk-create", data);
  return response;
};
const deleteUser = (id) => {
  let response = instance.delete(`/user/${id}`);
  return response;
};
const updateUser = (id, fullName, phone) => {
  const data = {
    _id: id,
    fullName: fullName,
    phone: phone,
  };
  let response = instance.put("/user", data);
  return response;
};
const getAllBooksWithPaginate = (query) => {
  let response = instance.get(query);
  return response;
};
const postCreateNewBook = (data) => {
  let Data = {
    thumbnail: data.thumbnail,
    slider: data.slider,
    mainText: data.mainText,
    author: data.author,
    price: data.price,
    sold: data.sold,
    quantity: data.quantity,
    category: data.category,
  };
  let response = instance.post("/book", Data);
  return response;
};
const getBookCategory = () => {
  let res = instance.get("/database/category");
  return res;
};
export {
  postLogin,
  postRegister,
  fetchAccount,
  postLogout,
  getUsersWithPaginate,
  postNewUser,
  postListUser,
  deleteUser,
  updateUser,
  getAllBooksWithPaginate,
  postCreateNewBook,
  getBookCategory,
};
