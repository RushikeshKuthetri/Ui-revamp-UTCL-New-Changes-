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
    <>
      <style>{`
        .ring-spin { animation: spin 1.6s cubic-bezier(0.4,0,0.2,1) infinite; }
        .arc-tail  { animation: tail-pulse 1.6s ease-in-out infinite; }
        .pulse-ring { animation: pulse-expand 2s infinite; }
        .pulse-ring-2 { animation: pulse-expand 2s infinite 0.7s; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes tail-pulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.7; }
        }
        @keyframes pulse-expand {
          0%   { transform: scale(0.9); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: scale(1.08); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-[140px] h-[140px]">

            {/* Pulse ring 1 */}
            <div
              className="pulse-ring absolute rounded-full"
              style={{
                inset: '-10px',
                border: '1.5px solid rgba(242, 193, 140, 0.55)',
              }}
            />

            {/* Pulse ring 2 */}
            <div
              className="pulse-ring-2 absolute rounded-full"
              style={{
                inset: '-22px',
                border: '1px solid rgba(242, 193, 140, 0.30)',
              }}
            />

            {/* SVG Ring */}
            <svg className="ring-spin w-[140px] h-[140px]" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"  stopColor="#f0a020" />
                  <stop offset="45%" stopColor="#C67614" />
                </linearGradient>
              </defs>

              <circle fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" cx="70" cy="70" r="60" />

              <circle
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="240"
                strokeDashoffset="60"
                cx="70" cy="70" r="60"
                transform="rotate(-90 70 70)"
              />

              <circle
                className="arc-tail"
                fill="none"
                stroke="rgba(229,131,52,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="60"
                cx="70" cy="70" r="60"
                transform="rotate(-90 70 70)"
              />
            </svg>

            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#FE8F12]">
                <img src={loader} alt="logo" className="w-17 h-[51px] object-contain relative z-10" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

