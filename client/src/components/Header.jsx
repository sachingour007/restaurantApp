import React from "react";
import heroBg from "../assets/images/hero-bg.jpg";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import BannerSlider from "./SliderComponant/BannerSlider";

const Header = () => {
  const navigate = useNavigate();
  return (
    <section className="heroSection">
      <div className="bg-box">
        <img src={heroBg} alt="heroImage" />
      </div>
      <header>
        <Navbar />
      </header>
      <div className="sliderContainer">
       
        <BannerSlider>
          <div className="contentContainer">
            <h1>Fast Food Restaurant</h1>
            <p>
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <div className="btn-box">
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </BannerSlider>
        {/* <BannerSlider>
          <div className="contentContainer">
            <h1>Fast Food Restaurant</h1>
            <p>
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <div className="btn-box">
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </BannerSlider> */}
       
      </div>
    </section>
  );
};

export default Header;
