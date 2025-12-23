import { useState } from "react";
import "./App.css";
import logo from "./assets/favicon.png";

export default function App() {
  const [cartLink, setCartLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [swiggyTotal, setSwiggyTotal] = useState("");
  const [zomatoTotal, setZomatoTotal] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState("");
  const [winner, setWinner] = useState("");

  // Detect Swiggy or Zomato
  const detectPlatform = (link) => {
    if (link.toLowerCase().includes("swiggy")) return "Swiggy";
    if (link.toLowerCase().includes("zomato")) return "Zomato";
    return "";
  };

  // Handle Compare Now button
  const handleCompareNow = (e) => {
    e.preventDefault();
    const detected = detectPlatform(cartLink);
    if (!detected) return alert("Paste a valid Swiggy or Zomato link");

    setPlatform(detected);
    setShowForm(true);
    setResult("");
    setWinner("");

    const otherPlatform = detected === "Swiggy" ? "Zomato" : "Swiggy";
    const otherUrl =
      otherPlatform === "Swiggy"
        ? "https://www.swiggy.com"
        : "https://www.zomato.com";

    // Open both platforms in new tabs
    window.open(cartLink, "_blank");
    window.open(otherUrl, "_blank");

    // Track clicks in backend (MongoDB)
    fetch("http://localhost:5000/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: detected, restaurant: "Unknown" }),
    }).catch(console.error);

    fetch("http://localhost:5000/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: otherPlatform, restaurant: "Unknown" }),
    }).catch(console.error);
  };

  // Handle Compare Price button
  const handlePriceCompare = (e) => {
    e.preventDefault();
    const sw = parseFloat(swiggyTotal);
    const zo = parseFloat(zomatoTotal);

    if (isNaN(sw) || isNaN(zo)) {
      setResult("Enter valid numbers from the app.");
      return;
    }

    if (sw === zo) {
      setWinner("Equal");
      setResult(`Both cost ₹${sw}`);
    } else if (sw < zo) {
      setWinner("Swiggy");
      setResult(`Swiggy is cheaper by ₹${(zo - sw).toFixed(2)}`);
    } else {
      setWinner("Zomato");
      setResult(`Zomato is cheaper by ₹${(sw - zo).toFixed(2)}`);
    }
  };

  return (
    <div className="page">
      <div className="glass-card">
        <img src={logo} className="logo" alt="MealSpy logo" />
        <h1>MealSpy</h1>
        <p>Compare food prices safely & legally</p>

        <form onSubmit={handleCompareNow}>
          <input
            placeholder="Paste Swiggy or Zomato cart link"
            value={cartLink}
            onChange={(e) => setCartLink(e.target.value)}
            required
          />
          <button disabled={!cartLink}>Compare Now</button>
        </form>

        {showForm && (
          <>
            <div className="instructions">
              <p>
                Open the carts in your mobile app. Copy the totals for each platform
                and enter below.
              </p>
            </div>

            <form onSubmit={handlePriceCompare}>
              <input
                placeholder="Swiggy total ₹"
                value={swiggyTotal}
                onChange={(e) => setSwiggyTotal(e.target.value)}
                className={winner === "Swiggy" ? "winner" : ""}
                required
              />
              <input
                placeholder="Zomato total ₹"
                value={zomatoTotal}
                onChange={(e) => setZomatoTotal(e.target.value)}
                className={winner === "Zomato" ? "winner" : ""}
                required
              />
              <button>Compare Price</button>
            </form>
          </>
        )}

        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}
