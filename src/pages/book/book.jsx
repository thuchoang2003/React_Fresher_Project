import * as React from "react";
import { useLocation } from "react-router-dom";
const Book = (props) => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");

  return <>book</>;
};

export default Book;
