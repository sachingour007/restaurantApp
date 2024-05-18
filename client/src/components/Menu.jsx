import React, { useState } from "react";
import { menuData } from "../constantFiles/menuContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import f1 from "../assets/images/f1.png";

const Menu = () => {
  const [foodItems, setFoodItems] = useState(menuData);
  return (
    <section className="menuSection">
      <div className="menuWrapper">
        <div className="secHeading">
          <h2>Our Menu</h2>
        </div>
        <div className="contentContainer">
          <div className="menuCardContainer">
            <div className="tabsList">
              <ul>
                <li>All</li>
                <li>Pizza</li>
                <li>Burger</li>
                <li>Pasta</li>
                <li>Fries</li>
              </ul>
            </div>
            <div className="tabContent">
              <div className="allCards">
                <div className="card">
                  <div className="imgBox">
                    <img src={f1} alt="" />
                  </div>
                  <div className="contentBox">
                    <h4>Delicious Pizza</h4>
                    <p>
                      Veniam debitis quaerat officiis quasi cupiditate quo,
                      quisquam velit, magnam voluptatem repellendus sed eaque
                    </p>
                    <div className="priceBox">
                      <p>$20</p>
                      <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="viewMore">
            <button>View More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
