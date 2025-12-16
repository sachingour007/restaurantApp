import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { f9 } from "../../assets/index";

const Cart = () => {
  return (
    <section className="cartSection">
      <div className="wrapper">
        <div className="cartHeading">
          <h1>Food Cart</h1>
        </div>
        <div className="cartLayout">
          <div className="itemList">
            <div className="card">
              <div className="imgBox">
                <img src={f9} alt="" />
              </div>
              <div className="details">
                <div className="titleBox">
                  <h3>Paneer Tikka</h3>
                  <p>₹598/-</p>
                </div>
                <div className="priceBox">
                  <FontAwesomeIcon icon={faTrashCan} size="xl"  />
                  <div className="countBtns">
                    <button>-</button> 
                    <span>2</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
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
