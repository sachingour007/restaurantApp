import React from "react";

const statusStyles = {
  pending: { background: "#fff3cd", color: "#856404" },
  confirmed: { background: "#d4edda", color: "#155724" },
  cancelled: { background: "#f8d7da", color: "#721c24" },
};

const BookingCard = ({
  fullName,
  phone,
  email,
  personCount,
  date,
  timeSlot,
  status,
}) => {
  return (
    <div className="detailCard">
      <div className="dateBox">
        <p className="date">📅 {date}</p>
        <p className="status" style={statusStyles[status]}>
          ⏳ {status}
        </p>
      </div>
      <div className="nameBox">
        <h4>👤 {fullName}</h4>
        <p>📧 {email}</p>
        <p>📞 {phone}</p>
        <p>👥 {personCount}</p>
        <p>🕒 {timeSlot}</p>
      </div>
    </div>
  );
};

export default BookingCard;
