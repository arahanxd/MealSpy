import { useState } from "react";
import "./App.css";

function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompare = () => {
    if (cartLink.trim() === "") {
      setError("⚠️ Please paste a cart link");
      setPlatform("");
      return;
    }

    setLoading(true);
    setError("");
    setPlatform("");

    setTimeout(() => {
      setLoading(false);
      if (cartLink.includes("swiggy")) setPlatform("Swiggy");
      else if (cartLink.includes("zomato")) setPlatform("Zomato");
      else setError("❌ Invalid or unsupported cart link");
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCompare();
  };

  return (
    <div className="app-container">
      <div className="card fade-slide">
        {/* Logo at the top */}
        <img src="/assets/favicon.png" alt="MealSpy Logo" className="logo" />
        
        <h1>🍔 MealSpy</h1>
        <p className="subtitle">Compare Swiggy & Zomato cart prices instantly!</p>

        <input
          type="text"
          value={cartLink}
          onChange={(e) => setCartLink(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Paste cart link here..."
        />

        <button onClick={handleCompare} className="hover-button">
          {loading ? <span className="loader"></span> : "Compare Prices"}
        </button>

        {error && <p className="error">{error}</p>}
        {platform && !loading && <p className="success">✅ Platform detected: <b>{platform}</b></p>}

        <p className="disclaimer">Not affiliated with Swiggy or Zomato.</p>
      </div>
    </div>
  );
}

export default App;
