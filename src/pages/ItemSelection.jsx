import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemSelection = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5500/api/user/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantity: parseInt(quantity, 10) || 0 },
    }));
  };

  const handleSubmit = () => {
    const filteredItems = Object.keys(selectedItems)
      .map((id) => ({
        ...items.find((item) => item.id === parseInt(id, 10)),
        quantity: selectedItems[id].quantity,
      }))
      .filter((item) => item.quantity > 0);

    navigate("/booking-form", { state: { selectedItems: filteredItems } });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Select Items to Move
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            className="border rounded-lg shadow-sm p-4 hover:shadow-md"
            key={item.id}
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">
              Dimensions: {item.dimensions.length}x
              {item.dimensions.width}x{item.dimensions.height} ft
            </p>
            <input
              type="number"
              className="mt-2 w-full border rounded-lg px-3 py-2"
              min="0"
              placeholder="Enter quantity"
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemSelection;
