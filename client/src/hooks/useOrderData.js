import React from "react";
import { BASE_URL } from "../constantFiles/baseURL";
import { addOrders, setLoading } from "../store/orderSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const useOrderData = () => {
  const dispatch = useDispatch();

  const getOrders = async () => {
    try {
      const res = await axios.get(BASE_URL + "/orders/my-orders", {
        withCredentials: true,
      });
      dispatch(addOrders(res.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return getOrders;
};

export default useOrderData;
