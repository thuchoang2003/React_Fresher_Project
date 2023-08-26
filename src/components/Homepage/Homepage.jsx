import Content from "./Content";
import SideBar from "./SideBar";
import "../../assets/scss/Homepage.scss";
const Homepage = (props) => {
  return (
    <div className="div-homepage">
      <SideBar />
      <Content />
    </div>
  );
};
export default Homepage;
