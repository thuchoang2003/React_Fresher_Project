import { useNavigate } from "react-router-dom";
import "../../assets/scss/NotFound.scss";
const NotFound = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-404">
        <div className="title">404</div>
        <div className="div-img">
          <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"></img>
        </div>
        <div className="description">
          <div className="text1">Look like you're lost</div>
          <div className="text2">
            the page which you are looking not avaible
          </div>
        </div>
        <div className="div-btn">
          <button onClick={() => navigate("/")}>Go to Homepage</button>
        </div>
      </div>
    </>
  );
};
export default NotFound;
