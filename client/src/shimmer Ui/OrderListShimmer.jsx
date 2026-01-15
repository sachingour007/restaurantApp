import React from "react";
import OrderShimmer from "./OrderShimmer";

const OrderListShimmer = () => {
  return (
    <div className="orderList">
      {[1, 2].map((_, index) => (
        <OrderShimmer key={index} />
      ))}
    </div>
  );
};

export default OrderListShimmer;
