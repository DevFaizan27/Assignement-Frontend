import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [packaging, setPackaging] = useState("single");
  const [floor, setFloor] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalItemCFT, setTotalItemCFT] = useState(0);
  const [totalPrice, setTotalPrice] = useState(null);
  const [google, setGoogle] = useState(null);

  const items=[
    {
      "id": "63a41f0d1c4e88b1",
      "name": "Sofa",
      "cft": 10,
      "dimensions": {
        "length": 6,
        "width": 3,
        "height": 2
      },
      "category": "Furniture"
    },
    {
      "id": "63a41f0d1c4e88b2",
      "name": "Table",
      "cft": 5,
      "dimensions": {
        "length": 4,
        "width": 3,
        "height": 2
      },
      "category": "Furniture"
    },
    {
      "id": "63a41f0d1c4e88b3",
      "name": "Chair",
      "cft": 2,
      "dimensions": {
        "length": 2,
        "width": 2,
        "height": 3
      },
      "category": "Furniture"
    },
    {
      "id": "63a41f0d1c4e88b4",
      "name": "Bed",
      "cft": 15,
      "dimensions": {
        "length": 7,
        "width": 5,
        "height": 3
      },
      "category": "Furniture"
    },
    {
      "id": "63a41f0d1c4e88b5",
      "name": "Wardrobe",
      "cft": 20,
      "dimensions": {
        "length": 6,
        "width": 4,
        "height": 7
      },
      "category": "Furniture"
    },
    {
      "id": "63a41f0d1c4e88b6",
      "name": "Fridge",
      "cft": 12,
      "dimensions": {
        "length": 3,
        "width": 3,
        "height": 6
      },
      "category": "Appliances"
    },
    {
      "id": "63a41f0d1c4e88b7",
      "name": "Washing Machine",
      "cft": 8,
      "dimensions": {
        "length": 3,
        "width": 3,
        "height": 4
      },
      "category": "Appliances"
    },
    {
      "id": "63a41f0d1c4e88b8",
      "name": "Microwave Oven",
      "cft": 2,
      "dimensions": {
        "length": 2,
        "width": 2,
        "height": 2
      },
      "category": "Appliances"
    },
    {
      "id": "63a41f0d1c4e88b9",
      "name": "Bookshelf",
      "cft": 10,
      "dimensions": {
        "length": 5,
        "width": 2,
        "height": 6
      },
      "category": "Furniture"
    },
    {
      "id": "63a41f0d1c4e88ba",
      "name": "TV Unit",
      "cft": 6,
      "dimensions": {
        "length": 4,
        "width": 2,
        "height": 3
      },
      "category": "Furniture"
    }
  ]
  

  useEffect(() => {
    // Load Google Maps JavaScript API
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDrROirhFaapbWyT1rusyEvBF0lpVxpUyE&libraries=places`;
      script.async = true;
      script.onload = () => setGoogle(window.google);
      document.body.appendChild(script);
    };

    loadGoogleMaps();

  

   
  }, []);

  useEffect(() => {
    if (google) {
      const autocompletePickup = new google.maps.places.Autocomplete(
        document.getElementById("pickup-input")
      );
      const autocompleteDropoff = new google.maps.places.Autocomplete(
        document.getElementById("dropoff-input")
      );

      autocompletePickup.addListener("place_changed", () => {
        const place = autocompletePickup.getPlace();
        setPickup(place.formatted_address || place.name);
      });

      autocompleteDropoff.addListener("place_changed", () => {
        const place = autocompleteDropoff.getPlace();
        setDropoff(place.formatted_address || place.name);
      });
    }
  }, [google]);

  const handleItemChange = (itemId, quantity) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;

    const existingItem = selectedItems.find((selected) => selected.id === itemId);
    let updatedItems;

    if (existingItem) {
      updatedItems = selectedItems.map((selected) =>
        selected.id === itemId ? { ...selected, quantity: Number(quantity) } : selected
      );
    } else {
      updatedItems = [...selectedItems, { id: itemId, name: item.name, cft: item.cft, quantity: Number(quantity) }];
    }

    setSelectedItems(updatedItems);

    const totalCFT = updatedItems.reduce((total, selected) => total + selected.cft * selected.quantity, 0);
    setTotalItemCFT(totalCFT);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post("http://localhost:5500/api/calculate", {
        pickup,
        dropoff,
        packaging,
        floor,
        items: selectedItems,
      });
      setTotalPrice(response.data);
    } catch (error) {
      console.error("Error calculating price", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Packers and Movers Price Calculator</h1>

      {/* Pickup and Dropoff Inputs with Google Autocomplete */}
      <div className="my-4">
        <input
          id="pickup-input"
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="block border p-2 my-2 w-full"
        />
        <input
          id="dropoff-input"
          type="text"
          placeholder="Dropoff Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="block border p-2 my-2 w-full"
        />
      </div>

      {/* Packaging and Floor */}
      <div className="my-4">
        <select
          value={packaging}
          onChange={(e) => setPackaging(e.target.value)}
          className="block border p-2 my-2 w-full"
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
        <input
          type="number"
          placeholder="Pickup/Dropoff Floor"
          value={floor}
          onChange={(e) => setFloor(Number(e.target.value))}
          className="block border p-2 my-2 w-full"
        />
      </div>

      {/* Item Selection */}
      <div className="my-4">
        <h2 className="text-xl font-semibold">Select Items:</h2>
        {items.map((item) => (
          <div key={item.id} className="flex items-center my-2">
            <span className="flex-1">
              {item.name} (CFT: {item.cft})
            </span>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              onChange={(e) => handleItemChange(item.id, e.target.value)}
              className="border p-2 w-20"
            />
          </div>
        ))}
      </div>

      {/* Total Item CFT */}
      <p className="text-lg font-semibold">Total CFT: {totalItemCFT}</p>

      {/* Calculate Price */}
      <button onClick={handleCalculate} className="bg-blue-500 text-white p-2 my-4">
        Calculate Price
      </button>
      {totalPrice !== null && <p className="mt-4 text-xl"><pre>{JSON.stringify(totalPrice,null,2)}</pre></p>}
    </div>
  );
}

export default App;
