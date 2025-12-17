import CartItemCard from "./CartItemCard";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { cartData } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
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

  useEffect(() => {
    getCart();
  }, []);
  console.log(cartData);

  return (
    <section className="cartSection">
      <div className="wrapper">
        <div className="cartHeading">
          <h1>Food Cart</h1>
        </div>
        <div className="cartLayout">
          <div className="itemList">
            {cartData !== null ? (
              cartData?.[0]?.item.map((el) => (
                <CartItemCard key={el._id} cartDetails = {el} />
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
                <span>₹1174</span>
              </div>
              <div className="billSummary">
                <span>GST (5%)</span>
                <span>₹59</span>
              </div>
              <div className="billSummary">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
              <div className="totalBox">
                <div className="innerTotalBox">
                  <span>Total</span>
                  <span className="">₹1273</span>
                </div>
              </div>
            </div>
            <div className="checkoutBtn">
              <button className="paymentBtn">Proceed to Checkout</button>
              <button className="shopingBtn">Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
