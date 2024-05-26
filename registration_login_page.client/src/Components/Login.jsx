import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
    const user = localStorage.getItem("user");
    if (user) {
      document.location = "/";
    }
  }, []);

  async function loginHandler(e) {
    e.preventDefault();
    const form_ = e.target;
    const formData = new FormData(form_);
    const dataToSend = {};
    
    for (const [key, value] of formData.entries()) {
      dataToSend[key] = value;
    }

    if (dataToSend.Remember === "on") {
      dataToSend.Remember = true;
    }

    const response = await fetch("api/SecureSite/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", dataToSend.Email);
      document.location = "/";
    } else {
      const messageEl = document.querySelector(".message");
      messageEl.innerHTML = data.message ? data.message : "Something went wrong";
      console.log("Login error:", data);
    }
  }

  return (
    <section className="login-page-wrapper page">
      <div className="login-page">
        <header>
          <h1>Login Page</h1>
        </header>
        <p className="message"></p>
        <div className="form-holder">
          <form action="#" className="login" onSubmit={loginHandler}>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="Email" id="email" required />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" required />
            <br />
            <input type="checkbox" name="Remember" id="remember" />
            <label htmlFor="remember"> Remember Password</label>
            <br />
            <br />
            <input type="submit" value="Login" className="login btn" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
