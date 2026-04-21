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



// import "./Loader.scss";
// import loader from '../../img/loader.png';

// export const ScreenLoader = () => {
//   return (
//     <div className="loader-overlay">
//       <div className="loader-box">


//         <div className="spinner"></div>

//         <img src={loader} className="loader-logo" alt="logo" />

//       </div>
//     </div>


//   );
// };

import "./Loader.scss";
import loader from '../../img/loader.png';
export const ScreenLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-core">

        <div className="ring-wrap">

          <div className="pulse-ring"></div>
          <div className="pulse-ring pulse-ring-2"></div>

          <svg className="ring-svg" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0a020" />
                <stop offset="45%" stopColor="#C67614" />
                {/* <stop offset="100%" stopColor="#b02010" /> */}
              </linearGradient>
            </defs>

            <circle className="ring-track" cx="70" cy="70" r="60" />
            <circle
              className="ring-arc-main"
              cx="70"
              cy="70"
              r="60"
              transform="rotate(-90 70 70)"
            />
            <circle
              className="ring-arc-tail"
              cx="70"
              cy="70"
              r="60"
              transform="rotate(-90 70 70)"
            />
          </svg>

          {/* Center Logo */}
        {/* Center Logo */}
<div className="logo-overlay">
  <div className="logo-backdrop">
    <img src={loader} className="loader-logo" alt="logo" />
  </div>
</div>
        </div>

        {/* Dots */}
        {/* <div className="dots-row">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        <div className="loading-label">Loading</div> */}

      </div>
    </div>
  );
};