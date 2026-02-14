import CartItemCard from "./CartItemCard";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThankyouPage } from "./ThankyouPage";
import {
  setPaymentSuccess,
  setPaymentFailed,
  setPaymentPending,
} from "../../store/paymentSlice";
import CartShimmerList from "../../shimmer Ui/CartShimmerList";

const Cart = () => {
  const { cartData, loading } = useSelector((store) => store.cart);
  const { showModal } = useSelector((store) => store.payment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    try {
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
    } catch (error) {
      console.log("PAYMENT ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <section className="cartSection">
        <div className="wrapper">
          <div className="cartHeading">
            <h1>Food Cart</h1>
          </div>
          {loading && <CartShimmerList />}

          {cartData && (
            <div className="cartLayout">
              <div className="itemList">
                {item.length > 0 ? (
                  item.map((el) => (
                    <CartItemCard key={el._id} cartDetails={el} />
                  ))
                ) : (
                  <div className="emptyCartBox">
                    <p>No Data In Cart !!</p>
                    <button onClick={() => navigate("/menu")}>Add Foods</button>
                  </div>
                )}
              </div>

              <div className="orderSummaryBox">
                <h3 className="">Order Summary</h3>
                <div className="billBox">
                  <div className="billSummary">
                    <span>Subtotal</span>
                    <span>₹{subTotal}/-</span>
                  </div>
                  <div className="billSummary">
                    <span>GST (5%)</span>
                    <span>₹{gstPrice}/-</span>
                  </div>
                  <div className="billSummary">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryCharges}/-</span>
                  </div>
                  <div className="totalBox">
                    <div className="innerTotalBox">
                      <span>Total</span>
                      <span className="">₹{totalPrice}/-</span>
                    </div>
                  </div>
                </div>
                <div className="checkoutBtn">
                  <button
                    className="paymentBtn"
                    onClick={checkoutHandler}
                    style={{
                      pointerEvents:
                        cartData.item.length === 0 ? "none" : "auto",
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
          )}
        </div>
      </section>
      {showModal && <ThankyouPage />}
    </>
  );
};

export default Cart;
