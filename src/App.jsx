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
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "500px", margin: "auto" }}>
      <h1>🍔 MealSpy</h1>
      <p>Paste your Swiggy or Zomato shared cart link below:</p>

      <input
        type="text"
        value={cartLink}
        onChange={(e) => setCartLink(e.target.value)}
        placeholder="https://www.swiggy.com/cart/share..."
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button onClick={handleCompare} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Compare Prices
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {platform && <p style={{ color: "green" }}>Platform detected: <b>{platform}</b></p>}

      <p style={{ fontSize: "12px", color: "gray", marginTop: "20px" }}>
        Not affiliated with Swiggy or Zomato.
      </p>
    </div>
  );
}

export default App;
