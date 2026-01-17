import { useSelector } from "react-redux";
import { useEffect } from "react";
import BookingCard from "./BookingCard";
import BookingShimmerGrid from "../../shimmer Ui/BookingShimmerGrid";
import useBookingData from "../../hooks/useBookingData";

const BookingShow = () => {
  const { bookingData, loading } = useSelector((store) => store.tableBooking);
  const getBookings = useBookingData();

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <section className="bookingDetails">
      <div className="secWrapper">
        <h2>Booking Details</h2>
        <div className="mainContainer">
          {loading ? (
            <BookingShimmerGrid />
          ) : bookingData.length > 0 ? (
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
