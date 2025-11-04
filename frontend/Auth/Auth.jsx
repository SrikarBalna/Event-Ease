import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.name || loginData.name.trim() === "") newErrors.name = "Name is required";
    if (!loginData.email || loginData.email.trim() === "") newErrors.email = "Email is required";
    if (!loginData.email.includes("@")) newErrors.email = "Please enter a valid email address";
    if (loginData.password.length <= 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (signupData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (!signupData.email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (signupData.password.length <= 8)
      newErrors.password = "Password must be at least 8 characters";
    if (signupData.password !== signupData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validation = validateLogin();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      alert("Login successful! Welcome back to EventEase");
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validation = validateSignup();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      alert("Account created! Welcome to EventEase");
      // navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>EventEase</h1>
          <p>Streamline your event management</p>
        </div>

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
            <form onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className={errors.name ? "error" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}

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
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
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
