import React, { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    document.title = "Register";
    const user = localStorage.getItem("user");
    if (user) {
      document.location = "/";
    }
  }, []);

  async function resgisterHandler(e) {
    e.preventDefault();
    const form_ = e.target;
    const formData = new FormData(form_);
    const dataToSend = {};

    for (const [key, value] of formData.entries()) {
      dataToSend[key] = value;
    }
    const newUsername = dataToSend.Name.trim().split("");
    dataToSend.UserName = newUsername.json("");

    const response = await fetch("api/SecureSite/register", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      document.location = "/login";
    }
    const messageE1 = document.querySelector(".message");
    if (data.message) {
      messageE1.innerHTML = data.message;
    } else {
      let errorMessage = "<div>Attention Please :</div><div class='normal'>";
      data.errors.foreach((error) => {
        errorMessage += error.description + " ";
      });
      errorMessage += "</div>";
      messageE1.innerHTML=errorMessage;
    }
  }

  return (
    <section className="register-page-wrapper page">
      <div className="register-page">
        <header>
          <h1>Register Page</h1>
        </header>
        <p className="message"></p>
        <div className="form-holder">
          <form action="#" className="register" onSubmit={resgisterHandler}>
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" name="Name" id="name" required />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="Email" id="email" required />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="passwordHash" id="password" required />

            <br />
            <input type="submit" value="Register" className="register btn" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
