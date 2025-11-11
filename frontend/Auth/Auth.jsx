import React, { useState } from "react";
import "./Auth.css";
import backgroundImg from "../Img/background.jpg"; // Your background image

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const resp = await fetch("https://event-ease-five-xi.vercel.app/auth/login" ,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        } ,
        body: JSON.stringify(loginData)
      })
      if (!resp.ok) {
        throw new Error("Login failed");
      }
      const data = await resp.json();
      console.log("Login successful:", data);
      setLoginData({ email: "", password: "" });
      alert("Login Successful");
    }catch(err){ 
      console.error("Login error:", err);
      alert("Login Failed");
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
   if (signupData.password !== signupData.confirmPassword) {
    alert("Passwords do not match");
      console.error("Passwords do not match");
      return;
    }
    try{
      const resp = await fetch("https://event-ease-five-xi.vercel.app/auth/signup" ,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        } ,
        body: JSON.stringify(signupData)
      })
      if (resp.status !== 201) {
        throw new Error("Signup failed");
      }
      const data = await resp.json();
      console.log("Signup successful:", data);
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    }catch(err){ 
      console.error("Signup error:", err);
      alert("Signup Failed");
    }
  }

  return (
    <div
      className="auth-page"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="auth-overlay"></div>
      <div className="auth-container">
        <div className="auth-card">
          <div className="tabs">
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={activeTab === "signup" ? "active" : ""}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "login" ? (
            <form
              onSubmit={handleLogin}
            >
              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <button type="submit">Sign In</button>
            </form>
          ) : (
            <form
              onSubmit={handleSignup}
            >
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <button type="submit">Create Account</button>
            </form>
          )}
        </div>

        <p className="terms">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;
