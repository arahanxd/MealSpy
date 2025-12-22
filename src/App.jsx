import { useState, useEffect } from "react";
import logo from "./assets/favicon.png";
import "./App.css";

export default function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [swiggyTotal, setSwiggyTotal] = useState("");
  const [zomatoTotal, setZomatoTotal] = useState("");
  const [result, setResult] = useState("");
  const [winner, setWinner] = useState(""); // "Swiggy" | "Zomato" | "Equal"

  useEffect(() => {
    if (cartLink.includes("swiggy")) {
      setPlatform("Swiggy");
    } else if (cartLink.includes("zomato")) {
      setPlatform("Zomato");
    } else {
      setPlatform("");
    }
  }, [cartLink]);

  const handleCompareNow = (e) => {
    e.preventDefault();
    if (!platform) return;

    const otherUrl =
      platform === "Swiggy"
        ? "https://www.zomato.com"
        : "https://www.swiggy.com";

    window.open(cartLink, "_blank"); // pasted cart
    window.open(otherUrl, "_blank"); // other platform

    setShowForm(true);
  };

  const handlePriceCompare = (e) => {
    e.preventDefault();

    const sw = parseFloat(swiggyTotal);
    const zo = parseFloat(zomatoTotal);

    if (isNaN(sw) || isNaN(zo)) {
      setResult("Please enter valid totals.");
      setWinner("");
      return;
    }

    const diff = Math.abs(sw - zo);
    if (diff === 0) {
      setResult(`Both platforms have the same price: ₹${sw.toFixed(2)}`);
      setWinner("Equal");
    } else if (sw < zo) {
      setResult(`Swiggy is cheaper by ₹${diff.toFixed(2)}`);
      setWinner("Swiggy");
    } else {
      setResult(`Zomato is cheaper by ₹${diff.toFixed(2)}`);
      setWinner("Zomato");
    }
  };

  return (
    <div className="page">
      <div className="glass-card">
        <img src={logo} alt="MealSpy" className="logo" />

        <h1 className="title">MealSpy</h1>
        <p className="subtitle">Compare food prices legally</p>

        {/* Compare Now Form */}
        <form onSubmit={handleCompareNow}>
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

        {/* Compare Price Form */}
        {showForm && (
          <form className="compare-form" onSubmit={handlePriceCompare}>
            <h3>Enter final prices</h3>

            <div className="price-inputs">
              <input
                type="number"
                placeholder="Swiggy total (₹)"
                value={swiggyTotal}
                onChange={(e) => setSwiggyTotal(e.target.value)}
                className={winner === "Swiggy" ? "winner" : ""}
              />
              <input
                type="number"
                placeholder="Zomato total (₹)"
                value={zomatoTotal}
                onChange={(e) => setZomatoTotal(e.target.value)}
                className={winner === "Zomato" ? "winner" : ""}
              />
            </div>

            <button type="submit">Compare Price</button>

            {result && <p className="result">{result}</p>}
          </form>
        )}

        <p className="footer">
          MealSpy never scrapes data or accesses your account.
        </p>
      </div>
    </div>
  );
}
