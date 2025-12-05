import React, { useEffect } from "react";
import heroBg from "../../assets/images/hero-bg.jpg";
import Navbar from "./Header";
import { useNavigate } from "react-router-dom";
import BannerSlider from "../SliderComponant/BannerSlider";
import OfferCard from "./OfferCard";
import useMenuData from "../../hooks/useMenuData";
import { useSelector } from "react-redux";

const Homepage = () => {
  const getMenu = useMenuData();
  const foodItems = useSelector((store) => store.menu);
  const featureCard = (foodItems || []).filter(
    (item) => item.isFeature === true
  );
  console.log(featureCard);

  const navigate = useNavigate();

  useEffect(() => {
    getMenu();
  }, []);

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
      <section className="featureCardSec">
        <div>
           <div className="secHeading">
            <h2>Our Menu</h2>
          </div>
          <div>
            
          </div>
        </div>

      </section>
      {/* <Menu cards={limitedCards} showTab={false} /> */}
    </>
  );
};

export default Homepage;
