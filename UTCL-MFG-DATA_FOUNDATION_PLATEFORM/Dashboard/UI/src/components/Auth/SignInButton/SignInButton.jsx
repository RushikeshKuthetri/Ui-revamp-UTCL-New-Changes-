import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../data/auth/Config";
import { addSessionStorage } from "../../../utils";

async function handleLogin(instance) {
  addSessionStorage("SLOG", "SLOG");
  await instance.loginRedirect(loginRequest);
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();
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
      onClick={() => handleLogin(instance)}
    >
      Sign in using Microsoft
    </button>
  );
};
