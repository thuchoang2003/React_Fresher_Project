import { HashLoader } from "react-spinners";
const Loading = (props) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <HashLoader color="#36d7b7" size="100" />
    </div>
  );
};
export default Loading;
