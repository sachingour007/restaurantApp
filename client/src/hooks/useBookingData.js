import React from "react";
import axios from "axios";
import { BASE_URL } from "../constantFiles/baseURL";
import { addBooking } from "../store/tableBookingSlice";
import { useDispatch } from "react-redux";

const useBookingData = () => {
  const dispatch = useDispatch();
  

  const getBookings = async () => {
    try {
      const res = await axios.get(BASE_URL + "/table-booking/myBooking", {
        withCredentials: true,
      });
      dispatch(addBooking(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  return getBookings;
};

export default useBookingData;
