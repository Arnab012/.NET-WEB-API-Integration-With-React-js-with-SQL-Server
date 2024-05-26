import React, { useEffect, useState } from "react";

const Admin = () => {
  document.title = "Admin";
  const [partners, setpartners] = useState({});
  useEffect(() => {
    fetch("api/SecureSite/admin", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setpartners(data.trustedPartners);
        console.log("User trustedPartners= :", data.trustedPartners);
      })
      .catch((error) => {
        console.log("Home page Error:", error);
      });
  }, []);
  return (
    <section className="admin-page page ">
      <header>
        <h1>Admin page </h1>
      </header>
      <section>
        {partners ? (
          <div>
            <div>our trusted partners are:</div>
            <ol>
              {partners.map((partner, i) => (
                <li key={i}>{partner}</li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="waiting-page">
            <div>waiting....</div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Admin;
