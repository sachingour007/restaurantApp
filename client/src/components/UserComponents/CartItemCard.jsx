import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../constantFiles/baseURL";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/cartSlice";
import axios from "axios";

const CartItemCard = ({ cartDetails }) => {
  const { foodId, foodImg, foodName, price, quantity, finalPrice } = cartDetails;
  const dispatch = useDispatch();

  const quantityHandler = async (val) => {
    try {
      const res = await axios.patch(
        BASE_URL + `/user/cart/update/${foodId}`,
        { type: val },
        {
          withCredentials: true,
        }
      );
      dispatch(setCart(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(BASE_URL + "/user/cart/remove/" + foodId, {
        withCredentials: true,
      });
      dispatch(setCart(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card" key={foodId}>
        <div className="imgBox">
          <img src={foodImg} alt="" />
        </div>
        <div className="details">
          <div className="titleBox">
            <h3>{foodName}</h3>
            <p>₹{finalPrice}/-</p>
          </div>
          <div className="priceBox">
            <FontAwesomeIcon
              icon={faTrashCan}
              size="xl"
              onClick={deleteHandler}
            />
            <div className="countBtns">
              <button onClick={() => quantityHandler("dec")}>-</button>
              <span>{quantity}</span>
              <button onClick={() => quantityHandler("inc")}>+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
