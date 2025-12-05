import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import f1 from "../../assets/images/f1.png";

const MenuCards = ({ foodImage, foodName, description, price }) => {
  return (
    <div className="card">
      <div className="imgBox">
        <img src={foodImage} alt="foodImage" />
      </div>
      <div className="contentBox">
        <h4>{foodName}</h4>
        <p>{description}</p>
        <div className="priceBox">
          <p>₹{price}/-</p>
          <span>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCards;
