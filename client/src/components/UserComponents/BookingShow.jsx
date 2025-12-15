import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constantFiles/baseURL";
import { addBooking } from "../../store/tableBookingSlice";
import { useEffect } from "react";
import BookingCard from "./BookingCard";

const BookingShow = () => {
  const { bookingData, loading } = useSelector((store) => store.tableBooking);
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

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <section className="bookingDetails">
      <div className="secWrapper">
        <h2>Booking Details</h2>
        <div className="mainContainer">
          {bookingData !== null ? (
            bookingData.map((details) => (
              <BookingCard key={details._id} {...details} />
            ))
          ) : (
            <p className="empty">No bookings found. Please book a table.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingShow;
