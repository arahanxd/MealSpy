import { useState } from "react";
import "./App.css";

function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");

  const handleCompare = () => {
    if (cartLink.trim() === "") {
      setError("Please paste a cart link");
      setPlatform("");
      return;
    }

    if (cartLink.includes("swiggy")) {
      setPlatform("Swiggy");
      setError("");
    } else if (cartLink.includes("zomato")) {
      setPlatform("Zomato");
      setError("");
    } else {
      setPlatform("");
      setError("Invalid or unsupported cart link");
    }
  };

  return (
    <div className="container">
      <h1>🍔 MealSpy</h1>
      <p>Paste your Swiggy or Zomato shared cart link below:</p>

      <input
        type="text"
        value={cartLink}
        onChange={(e) => setCartLink(e.target.value)}
        placeholder="https://www.swiggy.com/cart/share..."
      />

      <button onClick={handleCompare}>Compare Prices</button>

      {error && <p className="error">{error}</p>}
      {platform && <p className="success">Platform detected: <b>{platform}</b></p>}

      <p className="disclaimer">Not affiliated with Swiggy or Zomato.</p>
    </div>
  );
}

export default App;
