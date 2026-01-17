import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ThankyouPage = () => {
  const { status } = useSelector((store) => store.payment);
  const navigate = useNavigate();

  // Safety: direct URL hit na ho
  useEffect(() => {
    document.body.classList.add("modal-open");

    if (!status) {
      navigate("/cart");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [status, navigate]);

  const isSuccess = status === "SUCCESS";

  return (
    <div className="thank-you">
      <div className="thank-you__card">
        <div className={`checkmark ${isSuccess ? "success" : "failed"}`}>
          {isSuccess ? "✓" : "✕"}
        </div>

        <h1>{isSuccess ? "Payment Successful!" : "Payment Failed"}</h1>

        <p>
          {isSuccess
            ? "Thank you for your order. Your delicious food is being prepared 🍕🍔"
            : "Oops! Something went wrong with your payment. Please try again."}
        </p>

        <div className="actions">
          {isSuccess ? (
            <>
              <Link
                to="/menu"
                className="btn"
                onClick={() => dispatch(resetPayment())}
              >
                Order More
              </Link>
              <Link
                to="/orders"
                className="btn"
                onClick={() => dispatch(resetPayment())}
              >
                Check Orders
              </Link>
            </>
          ) : (
            <Link
              to="/cart"
              className="btn"
              onClick={() => dispatch(resetPayment())}
            >
              Try Again
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
