import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../store/cartSlice";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL";
import { toast } from "react-toastify";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const MenuCards = ({ items }) => {
  const { foodImage, foodName, description, price, _id, discount } = items;
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const addItemCart = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/user/cart/add",
        { foodId: _id, foodImg: foodImage, foodName: foodName, price: price },
        { withCredentials: true }
      );
      dispatch(setCart(res.data.data));
      toast.success("food Added !!");
    } catch (error) {
      console.log(error);
    }
  };

  const cartHandler = () => {
    addItemCart();
  };

  return (
    <motion.div
      className="card"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      
    >
      <div className="imgBox">
        <img src={foodImage} alt="foodImage" />
      </div>
      <div className="contentBox">
        <h4>{foodName}</h4>
        <p>{description}</p>
        <div className="priceBox">
          <p>₹{price}/-</p>
          {user && (
            <span onClick={cartHandler}>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
          )}
        </div>
      </div>
      {discount > 0 ? (
        <div className="discountTag">
          <p>{discount}% OFF</p>
        </div>
      ) : (
        ""
      )}
    </motion.div>
  );
};

export default MenuCards;
