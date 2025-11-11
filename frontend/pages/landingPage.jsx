import React from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="landing-container">
      <h1 className="title">Welcome to EventEase</h1>
      <p className="desc">Your ultimate event management solution.</p>
      <button className="get-started" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default LandingPage;