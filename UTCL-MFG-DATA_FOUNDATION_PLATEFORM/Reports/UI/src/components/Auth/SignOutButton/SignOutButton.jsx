import React from "react";
import { useMsal } from "@azure/msal-react";

import { useDispatch } from "react-redux";

export const SignOutButton = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch();

  const handleLogout = (instance) => {
    instance.logoutRedirect().catch((e) => {
      console.error(e);
    });
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "ERROR_FALSE" });
  };
  return (
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
      onClick={() => {
        handleLogout(instance);
      }}
    >
      Sign out
    </button>
  );
};
