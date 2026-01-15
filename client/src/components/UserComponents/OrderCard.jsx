import React, { useState } from "react";

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const previewItems = order.items.slice(0, 2);
  const extraCount = order.items.length - 2;

  return (
    <div className="orderCard">
      <div className="orderHeader">
        <div>
          <h4>Order #{order.orderId}</h4>
          <span className="date">
            {new Date(order.createdAt).toDateString()}
          </span>
        </div>

        <span className={`status ${order.orderStatus.toLowerCase()}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="orderItems">
        {previewItems.map((item) => (
          <div className="orderItem" key={item.foodId}>
            <div className="imgBox">
              <img src={item.foodImg} alt={item.foodName} />
            </div>
            <div>
              <p className="name">{item.foodName}</p>
              <span className="price">
                ₹{item.finalPrice} x {item.quantity}
              </span>
            </div>
          </div>
        ))}

        {extraCount > 0 && (
          <p className="moreItems">+{extraCount} more items</p>
        )}
      </div>

      <div className="orderFooter">
        {showDetails && (
          <div className="priceGroup">
            <p>SubTotal: ₹{order.pricing.subTotal}</p>
            <p>GST-Price: ₹{order.pricing.gstPrice}</p>
            <p>Delivery Charges: ₹{order.pricing.deliveryCharges}</p>
          </div>
        )}
        <div className="totalBox">
          <p className="total">Total: ₹{order.pricing.totalPrice}/-</p>
          <button
            className="detailsBtn"
            onClick={() => setShowDetails(!showDetails)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
