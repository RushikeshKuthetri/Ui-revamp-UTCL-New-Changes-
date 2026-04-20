// import "./Login.css";
// import logo from "../../img/logo.png";
// import { useSelector } from "react-redux";
// import { Alert, SignInButton, SignOutButton } from "../../components";
// import { useIsAuthenticated } from "@azure/msal-react";
// import { useEffect } from "react";
// import { MainDasboard } from "../index";
// export const Login = () => {
//   const { userStatus } = useSelector((state) => state);
//   const isAuthenticated = useIsAuthenticated();
//   useEffect(() => {
//     if (isAuthenticated) {
//       window.location.href = "/dashboard";
//     }
//   }, [isAuthenticated]);
//   return (
//     <>
//       {sessionStorage.getItem("SLOG") !== "SLOG" ? (
//         <div className="main-content mt-0 login">
//           <div className="container my-auto">
//             <div className="row">
//               <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0">
//                 <div className="left">
//                   <img src={logo} alt="logo_at_login" />
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0 card">
//                 <div className="right">
//                   {userStatus.error && <Alert errMsg={userStatus.error} />}
//                   <div>
//                     {isAuthenticated ? <SignOutButton /> : <SignInButton />}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };




// import "./Login.css";
import logo from "../../img/utclicon.png";
// import bgImage from "../../img/bgImage.png";
import login1 from "../../img/login1.png";
import loader from "../../img/loader.png";
import { useSelector } from "react-redux";
import { Alert, SignInButton, SignOutButton } from "../../components";
import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import { MainDasboard } from "../index";
export const Login = () => {
  const { userStatus } = useSelector((state) => state);
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated) {
      // window.location.href = "mimics/dashboard"; // Change this to the desired route after login to directs to mimics dashboard TRIDAI (22-02)
      window.location.href = "/dashboard"; // Change this to the desired route after login to directs to mimics dashboard TRIDAI (22-02)
    }
  }, [isAuthenticated]);
  return (
    <>
      {sessionStorage.getItem("SLOG") !== "SLOG" ? (
          <div
  className="fixed inset-0 w-screen h-screen flex items-center justify-end bg-no-repeat bg-cover bg-center"
  style={{ backgroundImage: `url(${login1})` }}
>
          {/* <div className="absolute inset-0 backdrop-blur-sm"></div> */}
                    <div
                      className="absolute 
                       right-[4%] sm:right-[5%] md:right-[6%] lg:right-[8%] xl:right-[5.3%] 2xl:right-[6.4%]
                       top-1/2 -translate-y-1/2"
                    >
                      <div
                        className=" bg-[var(--bg-header)] rounded-2xl shadow-xl
            shadow-inner  mb-3 
            shadow-[inset_0_0_10px_rgba(0,0,0,0.4)]
            px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14
            py-8 sm:py-10 md:py-12 lg:py-14 xl:py-6 2xl:py-14 
                         w-[85vw] 
                         sm:w-[360px] 
                         md:w-[400px] 
                         lg:w-[400px] 
                         xl:w-[380px] 
                         2xl:w-[540px]
          
                         max-w-[90%]"
                      >
                        <div className="flex justify-center">
                          <img
                            src={loader}
                            alt="logo_at_login"
                            className="h-8 mb-3 sm:h-10 md:h-12 lg:h-14 xl:h-28 2xl:h-36 object-contain"
                          />
                        </div>
          
                        <div className="flex justify-center">
                          {userStatus.error && <Alert errMsg={userStatus.error} />}
                          <div className="right">
                            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                          </div>
                        </div>
                      </div>
                    </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
