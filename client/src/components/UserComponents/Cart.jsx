import CartItemCard from "./CartItemCard";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartData, loading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/cart/my-cart", {
        withCredentials: true,
      });
      dispatch(setCart(res.data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutHandler = async () => {
    const res = await axios.post(BASE_URL + "/payment/create", cartData._id, {
      withCredentials: true,
    });

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    cartData && (
      <section className="cartSection">
        <div className="wrapper">
          <div className="cartHeading">
            <h1>Food Cart</h1>
          </div>
          <div className="cartLayout">
            <div className="itemList">
              {cartData.item.length !== 0 ? (
                cartData?.item.map((el) => (
                  <CartItemCard key={el._id} cartDetails={el} />
                ))
              ) : (
                <p>No Data In Cart</p>
              )}
            </div>
            <div className="orderSummaryBox">
              <h3 className="">Order Summary</h3>
              <div className="billBox">
                <div className="billSummary">
                  <span>Subtotal</span>
                  <span>₹{cartData.subTotal}/-</span>
                </div>
                <div className="billSummary">
                  <span>GST (5%)</span>
                  <span>₹{cartData.gstPrice}/-</span>
                </div>
                <div className="billSummary">
                  <span>Delivery Fee</span>
                  <span>₹{cartData.deliveryCharges}/-</span>
                </div>
                <div className="totalBox">
                  <div className="innerTotalBox">
                    <span>Total</span>
                    <span className="">₹{cartData.totalPrice}/-</span>
                  </div>
                </div>
              </div>
              <div className="checkoutBtn">
                <button className="paymentBtn" onClick={checkoutHandler}>
                  Proceed to Checkout
                </button>
                <button
                  className="shopingBtn"
                  onClick={() => {
                    navigate("/menu");
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Cart;
