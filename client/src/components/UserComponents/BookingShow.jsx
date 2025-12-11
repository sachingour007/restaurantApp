import React from "react";

const BookingShow = () => {
  return (
    <section className="bookingDetails">
      <div className="secWrapper">
        <div className="">
          <div>
            <span>date</span>
            <span>Name</span>
            <span>Persons</span>
            <span>Slot</span>
            <span>Status</span>
          </div>
          <div>
            <span>22 Dec 2025</span>
            <span>Sachin</span>
            <span>4</span>
            <span>7 PM – 9 PM</span>
            <span>Pending</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingShow;
