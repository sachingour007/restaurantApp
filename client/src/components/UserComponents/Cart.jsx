import CartItemCard from "./CartItemCard";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { setCart, resetCart } from "../../store/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThankyouPage } from "./ThankyouPage";
import {
  setPaymentSuccess,
  setPaymentFailed,
  setPaymentPending,
} from "../../store/paymentSlice";

const Cart = () => {
  const { cartData, loading } = useSelector((store) => store.cart);
  const { showModal } = useSelector((store) => store.payment);
  console.log(showModal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/cart/my-cart", {
        withCredentials: true,
      });
      dispatch(setCart(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const {
    _id,
    gstPrice,
    item,
    userId,
    totalItems,
    subTotal,
    deliveryCharges,
    totalPrice,
  } = cartData || {};

  const paymentVarifyHandler = async (orderId) => {
    try {
      const res = await axios.get(BASE_URL + "/payment/status/" + orderId, {
        withCredentials: true,
      });
      const paymentStatus = res.data.data.status;
      if (paymentStatus === "SUCCESS") {
        dispatch(setPaymentSuccess());
        dispatch(resetCart());
      } else if (paymentStatus === "FAILED") {
        dispatch(setPaymentFailed());
      } else {
        dispatch(setPaymentPending(orderId));
      }
    } catch (error) {
      dispatch(setPaymentFailed("Unable to verify payment"));
    }
  };

  const checkoutHandler = async () => {
    const res = await axios.post(
      BASE_URL + "/payment/create",
      { cartId: _id },
      {
        withCredentials: true,
      }
    );

    const { savedPayment, keyId } = res.data.data;

    const options = {
      key: keyId,
      amount: savedPayment.amount,
      currency: savedPayment.currency,
      name: "Hot Cornor",
      description: "Testy Fast Food",
      order_id: savedPayment.orderId,
      prefill: {
        name: savedPayment.notes.fullName,
        email: savedPayment.notes.email,
        contact: savedPayment.notes.phone,
      },
      theme: {
        color: "#F37254",
      },
      handler: () => paymentVarifyHandler(savedPayment.orderId),
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <section className="cartSection">
        <div className="wrapper">
          <div className="cartHeading">
            <h1>Food Cart</h1>
          </div>

          <div className="cartLayout">
            {cartData !== null ? (
              <div className="itemList">
                {Array.isArray(item) && item.length > 0 ? (
                  item.map((el) => (
                    <CartItemCard key={el._id} cartDetails={el} />
                  ))
                ) : (
                  <p>No Data In Cart</p>
                )}
              </div>
            ) : (
              <div className="itemList">
                <p>No Data In Cart</p>
              </div>
            )}

            <div className="orderSummaryBox">
              <h3 className="">Order Summary</h3>
              <div className="billBox">
                <div className="billSummary">
                  <span>Subtotal</span>
                  <span>₹{cartData !== null ? subTotal : 0}/-</span>
                </div>
                <div className="billSummary">
                  <span>GST (5%)</span>
                  <span>₹{cartData !== null ? gstPrice : 0}/-</span>
                </div>
                <div className="billSummary">
                  <span>Delivery Fee</span>
                  <span>₹{cartData !== null ? deliveryCharges : 0}/-</span>
                </div>
                <div className="totalBox">
                  <div className="innerTotalBox">
                    <span>Total</span>
                    <span className="">
                      ₹{cartData !== null ? totalPrice : 0}/-
                    </span>
                  </div>
                </div>
              </div>
              <div className="checkoutBtn">
                <button
                  className="paymentBtn"
                  onClick={checkoutHandler}
                  style={{
                    pointerEvents: cartData === null ? "none" : "auto",
                  }}
                >
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
      {showModal && <ThankyouPage />}
    </>
  );
};

export default Cart;
