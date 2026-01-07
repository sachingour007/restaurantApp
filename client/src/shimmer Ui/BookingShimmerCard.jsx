const BookingShimmerCard = () => {
  return (
    <div className="booking-shimmer-card">
      <div className="booking-header">
        <div className="shimmer shimmer-date"></div>
        <div className="shimmer shimmer-status"></div>
      </div>

      <div className="booking-body">
        <div className="shimmer shimmer-line"></div>
        <div className="shimmer shimmer-line"></div>
        <div className="shimmer shimmer-line"></div>
        <div className="shimmer shimmer-line small"></div>
        <div className="shimmer shimmer-line small"></div>
      </div>
    </div>
  );
};

export default BookingShimmerCard;
