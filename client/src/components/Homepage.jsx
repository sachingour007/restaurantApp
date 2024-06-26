import React from "react";
import heroBg from "../assets/images/hero-bg.jpg";
import Navbar from "./Header";
import { useNavigate } from "react-router-dom";
import BannerSlider from "./SliderComponant/BannerSlider";
import OfferCard from "./OfferCard";
import { menuData } from "../constantFiles/menuContent";
import Menu from "./Menu";

const Homepage = () => {
  const navigate = useNavigate();
  const limitedCards = menuData.slice(0, 3);
  return (
    <>
      <section className="heroSection">
        <div className="heroWrapper">
          <div className="bg-box">
            <img src={heroBg} alt="heroImage" />
          </div>
          <div className="sliderhead">
            <div className="sliderContainer">
              <BannerSlider>
                <div>
                  <div className="contentContainer">
                    <h1>Fast Food Restaurant</h1>
                    <p>
                      Doloremque, itaque aperiam facilis rerum, commodi,
                      temporibus sapiente ad mollitia laborum quam quisquam esse
                      error unde. Tempora ex doloremque, labore, sunt repellat
                      dolore, iste magni quos nihil ducimus libero ipsam.
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
                </div>

                <div>
                  <div className="contentContainer">
                    <h1>Fast Food Restaurant</h1>
                    <p>
                      Doloremque, itaque aperiam facilis rerum, commodi,
                      temporibus sapiente ad mollitia laborum quam quisquam esse
                      error unde. Tempora ex doloremque, labore, sunt repellat
                      dolore, iste magni quos nihil ducimus libero ipsam.
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
                </div>

                <div>
                  <div className="contentContainer">
                    <h1>Fast Food Restaurant</h1>
                    <p>
                      Doloremque, itaque aperiam facilis rerum, commodi,
                      temporibus sapiente ad mollitia laborum quam quisquam esse
                      error unde. Tempora ex doloremque, labore, sunt repellat
                      dolore, iste magni quos nihil ducimus libero ipsam.
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
                </div>
              </BannerSlider>
            </div>
          </div>
        </div>
      </section>
      <OfferCard />
      <Menu cards={limitedCards} showTab={false} />
    </>
  );
};

export default Homepage;
