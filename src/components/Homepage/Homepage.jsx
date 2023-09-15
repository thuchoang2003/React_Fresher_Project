import Content from "./Content";
import SideBar from "./SideBar";
import "../../assets/scss/Homepage.scss";
const Homepage = (props) => {
  return (
    <div className="div-homepage" style={{ maxWidth: 1440, margin: "0 auto" }}>
      {/* <SideBar /> */}
      <Content />
    </div>
  );
};
export default Homepage;
