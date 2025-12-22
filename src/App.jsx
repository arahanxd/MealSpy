import { useState, useEffect } from "react";
import logo from "./assets/favicon.png";
import "./App.css";

export default function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (cartLink.includes("swiggy")) {
      setPlatform("Swiggy");
    } else if (cartLink.includes("zomato")) {
      setPlatform("Zomato");
    } else {
      setPlatform("");
    }
  }, [cartLink]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!platform) return;

    // Open pasted cart
    window.open(cartLink, "_blank");

    // Open other platform
    const otherUrl =
      platform === "Swiggy"
        ? "https://www.zomato.com"
        : "https://www.swiggy.com";

    window.open(otherUrl, "_blank");

    setShowForm(true);
  };

  return (
    <div className="page">
      <div className="glass-card">
        <img src={logo} alt="MealSpy" className="logo" />

        <h1 className="title">MealSpy</h1>
        <p className="subtitle">Compare food prices legally</p>

        {/* FORM so Enter works */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste Swiggy or Zomato shared cart link"
            value={cartLink}
            onChange={(e) => setCartLink(e.target.value)}
          />

          <button type="submit" disabled={!platform}>
            Compare Now
          </button>
        </form>

        {showForm && (
          <div className="compare-form">
            <h3>Enter final prices</h3>

            <input type="number" placeholder="Swiggy total (₹)" />
            <input type="number" placeholder="Zomato total (₹)" />

            <button>Compare Price</button>
          </div>
        )}

        <p className="footer">
          MealSpy never scrapes data or accesses your account.
        </p>
      </div>
    </div>
  );
}
