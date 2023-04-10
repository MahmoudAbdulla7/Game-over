import React from "react";
import Navbar from "../Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loading/Loading";
export default function Layout({setUserData ,userData}) {
  function logOut() {
    localStorage.removeItem("userData");
    setUserData("");
    <Navigate to={"/login"} />;
  }

  return (
    <>
      <Navbar logOut={logOut} userData={userData} />
      <Outlet />
    </>
  );
}
