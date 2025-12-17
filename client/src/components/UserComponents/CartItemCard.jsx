import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { f9 } from "../../assets/index";

const CartItemCard = ({ cartDetails }) => {
  const { foodId, foodImg, foodName, price, quantity } = cartDetails;

  return (
    <>
      <div className="card" key={foodId}>
        <div className="imgBox">
          <img src={foodImg} alt="" />
        </div>
        <div className="details">
          <div className="titleBox">
            <h3>{foodName}</h3>
            <p>₹{price}/-</p>
          </div>
          <div className="priceBox">
            <FontAwesomeIcon icon={faTrashCan} size="xl" />
            <div className="countBtns">
              <button>-</button>
              <span>{quantity}</span>
              <button>+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
