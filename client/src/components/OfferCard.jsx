import React, { useState } from "react";
import offers from "../constantFiles/offerfilesConstant.js";

const OfferCard = () => {
  const [offersData, setOffersData] = useState(offers);
  return (
    <section className="offerSection">
        <div className="offerWrapper">
            <div className="offerCardContainer">
               {offersData.map(({id,offerName,percentage, img, order}) => {
                return (
                    <div className="card" key={id}>
                        <div className="imgBox">
                            <img src={img} alt="" />
                        </div>
                        <div className="contentBox">
                            <h5>{offerName}</h5>
                            <h6>{percentage}</h6>
                            <button>{order}</button>
                        </div>
                    </div>
                )
               })}
            </div>
        </div>
    </section>
  );
};

export default OfferCard;
