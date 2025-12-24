export default function App() {

  const track = async (platform) => {
    await fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform,
        restaurant: "Burger King"
      })
    });
    alert(`${platform} clicked`);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>MealSpy</h1>

      <button onClick={() => track("Swiggy")}>
        Open Swiggy
      </button>

      <br /><br />

      <button onClick={() => track("Zomato")}>
        Open Zomato
      </button>
    </div>
  );
}
