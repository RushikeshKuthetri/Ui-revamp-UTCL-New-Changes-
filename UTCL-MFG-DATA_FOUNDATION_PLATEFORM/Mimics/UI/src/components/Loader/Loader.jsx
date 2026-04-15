// import Loader from "react-js-loader";
// import "./Loader.scss";

// export const ScreenLoader = () => {
//   return (
//     <div className="popup-box">
//       <span className="loader-div">
//         <Loader
//           type="spinner-circle"
//           bgColor={"#000000"}
//           title={"bubble-scale"}
//           color={"#FFFFFF"}
//           size={80}
//         />
//       </span>
//     </div>
//   );
// };



import "./Loader.scss";
import loader from '../../img/loader.png';

export const ScreenLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-box">


        <div className="spinner"></div>

        <img src={loader} className="loader-logo" alt="logo" />

      </div>
    </div>


  );
};

