import { BASE_URL } from "../constantFiles/baseURL";
import { setCart, setLoading } from "../store/cartSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const useCartData = () => {
  const dispatch = useDispatch();
  const getCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/cart/my-cart", {
        withCredentials: true,
      });
      dispatch(setCart(res.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return getCart;
};

export default useCartData;
