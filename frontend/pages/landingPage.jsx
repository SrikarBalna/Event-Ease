import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import heroImage from "../Img/background.jpg";
// import heroImage from "@/assets/event-hero.jpg"; // replace with your image path

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="landing-container">
      <div 
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="overlay" />

        <div className="hero-content">
          <h1 className="title">
            Streamline Your <span>Event Management</span>
          </h1>
          <p className="desc">
            Create, organize, and manage workshops, seminars<br/>and college fests effortlessly.
          </p>
          <button className="get-started" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;