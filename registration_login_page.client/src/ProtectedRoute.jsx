import { useState, useEffect } from "react";
import {  Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
  const [IsloggedIn, setIsloggedIn] = useState(false);
  const [Iswaiting, setwaiting] = useState(true);
  useEffect(() => {
    fetch("api/SecureSite/xhtlekd", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsloggedIn(true);
        setwaiting(false);
        localStorage.setItem("user", data.user.email);
        console.log(data.user);
      })
      .catch((err) => {
        console.log("Error in protected Route:", err);
        setwaiting(false);
        localStorage.removeItem("user");
      });
    return Iswaiting ? (
      <div className="waiting-page">
        <div>waiting.....</div>
      </div>
    ) : IsloggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  });
}

export default ProtectedRoute;
