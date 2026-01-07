import BookingShimmerCard from "./BookingShimmerCard.jsx";

const BookingShimmerGrid = () => {
  return (
    <div className="booking-shimmer-grid">
      {Array(4)
        .fill("")
        .map((_, i) => (
          <BookingShimmerCard key={i} />
        ))}
    </div>
  );
};

export default BookingShimmerGrid;
