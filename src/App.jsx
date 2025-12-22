import { useState, useEffect } from "react";
import logo from "./assets/favicon.png";
import "./App.css";

function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 🔍 Auto-detect while typing
  useEffect(() => {
    if (cartLink.includes("swiggy")) {
      setPlatform("Swiggy");
      setError("");
    } else if (cartLink.includes("zomato")) {
      setPlatform("Zomato");
      setError("");
    } else {
      setPlatform("");
    }
  }, [cartLink]);

  const handleCompare = (e) => {
    e.preventDefault();

    if (!cartLink.trim()) {
      setError("Please paste a cart link");
      return;
    }

    if (!platform) {
      setError("Unsupported or invalid cart link");
      return;
    }

    setError("");
    setSubmitted(true);
    setLoading(true);

    // ⏳ Fake API delay (backend later)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="page">
      <div className="glass-card">
        {/* LOGO */}
        <img src={logo} alt="MealSpy Logo" className="logo" />

        <h1 className="title">MealSpy</h1>
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

          <button type="submit" disabled={loading}>
            {loading ? "Comparing..." : "Compare"}
          </button>
        </form>

        {/* STATUS */}
        {platform && !loading && (
          <p className="success">Detected platform: <b>{platform}</b></p>
        )}
        {error && <p className="error">{error}</p>}

        {/* LOADER */}
        {loading && <div className="loader"></div>}

        {/* COMPARISON SKELETON */}
        {submitted && !loading && (
          <div className="comparison">
            <div className="compare-card">
              <h3>Swiggy</h3>
              <p>Items: —</p>
              <p>Total: ₹ —</p>
            </div>

            <div className="compare-card">
              <h3>Zomato</h3>
              <p>Items: —</p>
              <p>Total: ₹ —</p>
            </div>
          </div>
        )}

        <p className="footer">
          Not affiliated with Swiggy or Zomato
        </p>
      </div>
    </div>
  );
}

export default App;
