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
export {
  postLogin,
  postRegister,
  fetchAccount,
  postLogout,
  getUsersWithPaginate,
  postNewUser,
  postListUser,
  deleteUser,
};
