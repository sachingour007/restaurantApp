import React, { useState } from "react";
import offers from "../../constantFiles/offerfilesConstant.js";

const OfferCard = ({
  foodImage,
  foodName,
  discount,
  discountTitle,
  discountTagline,
}) => {
  return (
    <div className="card">
      <div className="imgBox">
        <img src={foodImage} alt="" />
      </div>
      <div className="contentBox">
        <h5>{discountTitle}</h5>
        <h6>{discount}%</h6>
        <button>Order Now</button>
      </div>
    </div>
  );
};

export default OfferCard;
