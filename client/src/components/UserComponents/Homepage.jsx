import React, { useEffect } from "react";
import heroBg from "../../assets/images/hero-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import useMenuData from "../../hooks/useMenuData";
import { useSelector } from "react-redux";
import MenuCards from "./MenuCards";
import { hompageSectionTwo } from "../../assets";
import Testimonials from "./Testimonials";
import MenuShimmer from "../../shimmer Ui/MenuShimmer";

const Homepage = () => {
  const getMenu = useMenuData();
  const navigate = useNavigate();
  const foodItems = useSelector((store) => store.menu);

  const featureCard = (foodItems || []).filter(
    (item) => item.isFeature === true
  );

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
              <div>
                <div className="contentContainer">
                  <h1>Fast Food Restaurant</h1>
                  <p>
                    From juicy burgers to perfectly crispy fries, we serve fast
                    food made with quality ingredients and bold flavors. Quick
                    service, great taste, and a meal you'll love every time.
                  </p>
                  <div className="btn-box">
                    <button
                      onClick={() => {
                        navigate("/menu");
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
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

      <section className="menuSection homepageMenuSec">
        <div className="menuWrapper">
          <div className="secHeading">
            <h2>Our Menu</h2>
          </div>
          <div className="contentContainer">
            <div className="menuCardContainer">
              <div className="tabContent">
                {featureCard.length > 0 ? (
                  <div className="allCards">
                    {featureCard.map((items) => {
                      return <MenuCards key={items._id} items={items} />;
                    })}
                  </div>
                ) : (
                  <MenuShimmer val={3} />
                )}
              </div>
            </div>
            <div className="viewMore">
              <Link to={"/menu"}>View More</Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Homepage;
