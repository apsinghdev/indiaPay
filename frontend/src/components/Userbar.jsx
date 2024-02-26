import Sendbtn from "./Sendbtn";
import PropTypes from "prop-types";
import imgPath from "../assets/user-dp.jpg";

function Userbar(props) {
  return (
    <div className="bg-white h-10 w-10/12 rounded-md flex justify-between justify-center items-center grid-cols-5 ">
      <div className="flex grid-cols-2">
        <img src={imgPath} className="rounded-full object-cover h-8 w-8 ml-4" />
        <h2 className="ml-4 justify-center items-center flex font-sans font-bold">{props.name}</h2>
      </div>
      <Sendbtn />
    </div>
  );
}

// Userbar.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default Userbar;
