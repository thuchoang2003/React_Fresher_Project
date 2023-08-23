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

export { postLogin, postRegister };
