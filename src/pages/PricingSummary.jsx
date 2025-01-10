import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PricingSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleConfirm = () => {
    axios
      .post("http://localhost:5000/api/user/book-service", state)
      .then(() => {
        navigate("/booking-confirmation");
      });
  };

  return (
    <div>
      <h1>Pricing Summary</h1>
      <p>Total Price: ${state.price}</p>
      <button onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
};

export default PricingSummary;
