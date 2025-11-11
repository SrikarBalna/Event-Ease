import React from "react";
import "./landing.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="title">Welcome to EventEase</h1>
      <p className="desc">Your ultimate event management solution.</p>
      <button className="get-started">Get Started</button>
    </div>
  );
};

export default LandingPage;