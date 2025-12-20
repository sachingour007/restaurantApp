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
          <div className="offerCardContainer">
            {OfferCards.map((card) => (
              <OfferCard key={card._id} {...card} />
            ))}
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
    </>
  );
};

export default Homepage;
