import React, { useEffect } from "react";
import heroBg from "../../assets/images/hero-bg.jpg";
import Navbar from "./Header";
import { Link, useNavigate } from "react-router-dom";
import BannerSlider from "../SliderComponant/BannerSlider";
import OfferCard from "./OfferCard";
import useMenuData from "../../hooks/useMenuData";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import MenuCards from "./MenuCards";
import { hompageSectionTwo } from "../../assets";

const Homepage = () => {
  const getMenu = useMenuData();
  const navigate = useNavigate();
  const foodItems = useSelector((store) => store.menu);

  const featureCard = (foodItems || []).filter(
    (item) => item.isFeature === true
  );
  const OfferCards = (foodItems || []).filter((item) => item.discount > 0);

  console.log(OfferCards);

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
      <section className="offerSection">
        <div className="offerWrapper">
          <h2>Crafted with Love, Served with Flavor</h2>
          <div className="offerCardContainer">
            {/* {OfferCards.map((card) => (
              <OfferCard key={card._id} {...card} />
            ))} */}

            <div className="textBox">
              <p>
                We believe great food starts with the finest ingredients and a
                passion for perfection. From freshly baked pizzas to juicy
                burgers and creamy pastas, every dish is prepared to give you a
                memorable dining experience. Taste the quality, feel the
                freshness, and enjoy food made just for you.
              </p>
            </div>
            <div className="imgBox">
              <img src={hompageSectionTwo} alt="img" />
            </div>
          </div>
        </div>
      </section>

      {featureCard && (
        <section className="menuSection homepageMenuSec">
          <div className="menuWrapper">
            <div className="secHeading">
              <h2>Our Menu</h2>
            </div>
            <div className="contentContainer">
              <div className="menuCardContainer">
                <div className="tabContent">
                  <div className="allCards">
                    {featureCard.map((items) => {
                      return <MenuCards key={items._id} items={items} />;
                    })}
                  </div>
                </div>
              </div>
              <div className="viewMore">
                <Link to={"/menu"}>View More</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="our-services section-padding30">
        <div className="container">
          <div className="row justify-content-sm-center">
            <div className="cl-xl-7 col-lg-8 col-md-10">
              <div className="section-tittle text-center mb-70">
                <span>Servicees We Offer</span>
                <h2>Our Best Services</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" col-lg-4 col-md-6 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-restaurant"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="#">Best Chef</a>
                  </h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-6 col-sm-6">
              <div className="single-services active text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-tools-and-utensils-1"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="#">Quality Food</a>
                  </h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-6 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-restaurant"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
