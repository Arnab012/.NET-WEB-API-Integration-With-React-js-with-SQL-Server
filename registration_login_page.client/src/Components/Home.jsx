import React, { useEffect, useState } from "react";

const Home = () => {
  document.title = "Welcome";
  const [userInfo, setuserInfo] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("user");
    fetch("api/SecureSite/home" + user, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setuserInfo(data.userInfo);
        console.log("User info :", data.userInfo);
      })
      .catch((error) => {
        console.log("Home page Error:", error);
      });
  }, []);
  return (
    <section>
      <header>
        <h1>Welcome to Your Page </h1>
      </header>

      {userInfo ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CreatedDate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userInfo.name}</td>
                <td>{userInfo.email}</td>
                <td>
                  {userInfo.createDate ? userInfo.createDate.split(":")[0] : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="warning">
          <div>Acess Denined ......!!!!!!</div>
        </div>
      )}
    </section>
  );
};

export default Home;
