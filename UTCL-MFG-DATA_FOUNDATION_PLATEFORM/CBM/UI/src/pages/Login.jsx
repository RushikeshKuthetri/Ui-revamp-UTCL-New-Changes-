import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
// import LOGO from "../components/assets/logo.png";
import loader from "../components/assets/loader.png";
// import "../styles/login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/",
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setTimeout(() => {
      if (!!activeAccount) {
        sessionStorage.setItem("accountDetails", JSON.stringify(activeAccount));
        navigate("/");
      }
    }, 300);
  }, [activeAccount]);
  return (
    <>
      {!!!activeAccount && (
        <div
          className="fixed inset-0 w-screen h-screen flex items-center justify-end bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url(\login1.png)" }}
        >
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
                <div className="h-8 mb-3 sm:h-10 md:h-12 lg:h-14 xl:h-28 2xl:h-36 object-contain">
                  <img src={loader} alt="logo_at_login" />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                   className="
        bg-[#F1E0CD] text-[#111111] !border border-[#C7743A]
        text-xs sm:text-sm md:text-base lg:text-md 2xl:text-lg
        px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12
        py-2 sm:py-2.5 md:py-3 lg:py-3.5 2xl:py-4
        rounded-full shadow 
        hover:shadow-md hover:scale-105 
        transition-all duration-200
      "
                  onClick={handleLoginRedirect}
                >
                  Sign in using Microsoft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
