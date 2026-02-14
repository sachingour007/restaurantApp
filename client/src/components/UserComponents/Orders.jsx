import React from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import OrderListShimmer from "../../shimmer Ui/OrderListShimmer";

const Orders = () => {
  const { orders, loading } = useSelector((store) => store.orders);

  return (
    <section className="myOrders">
      <div className="container">
        <h1>My Orders</h1>

        {loading ? (
          <OrderListShimmer />
        ) : orders.length > 0 ? (
          <div className="orderList">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <div className="emptyOrders">
            <p>No Data In Orders !!</p>
            <button onClick={() => navigate("/menu")}>Make order</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
