import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickupAddress: "",
    destinationAddress: "",
    distance: 0,
    serviceType: "basic",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      selectedItems: state.selectedItems,
      ...form,
    };
    axios
      .post("http://localhost:5500/api/user/calculate-price", payload)
      .then((response) => {
        navigate("/pricing-summary", {
          state: { ...payload, price: response.data.price },
        });
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Booking Form</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Pickup Address</label>
          <input
            type="text"
            name="pickupAddress"
            value={form.pickupAddress}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter pickup address"
          />
        </div>
        <div>
          <label className="block text-gray-700">Destination Address</label>
          <input
            type="text"
            name="destinationAddress"
            value={form.destinationAddress}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter destination address"
          />
        </div>
        <div>
          <label className="block text-gray-700">Distance (in miles)</label>
          <input
            type="number"
            name="distance"
            value={form.distance}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Service Type</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="basic">Basic</option>
            <option value="full">Full</option>
          </select>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Calculate Price
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
