import { useState } from "react";
import "./App.css";

function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");

  const handleCompare = (e) => {
    e.preventDefault();

    if (!cartLink.trim()) {
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
      setError("Unsupported or invalid cart link");
    }
  };

  return (
    <div className="page">
      <div className="glass-card">
        <h1 className="title">🍽️ MealSpy</h1>
        <p className="subtitle">
          Compare Swiggy & Zomato cart prices instantly
        </p>

        <form onSubmit={handleCompare}>
          <input
            type="text"
            placeholder="Paste shared cart link here"
            value={cartLink}
            onChange={(e) => setCartLink(e.target.value)}
          />

          <button type="submit">Compare</button>
        </form>

        {error && <p className="error">{error}</p>}
        {platform && (
          <p className="success">
            Platform detected: <b>{platform}</b>
          </p>
        )}

        <p className="footer">Not affiliated with Swiggy or Zomato</p>
      </div>
    </div>
  );
}

export default App;
