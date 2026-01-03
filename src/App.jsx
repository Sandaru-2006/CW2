import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import properties from "./data/properties.json";

function App() {
  // Load favourites from localStorage on app start
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Toggle add / remove favourites
  function addToFavourites(id) {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((fav) => fav !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  return (
    <div className="app-container">
      <h1>Estate Agent App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              properties={properties.properties}
              favourites={favourites}
              addToFavourites={addToFavourites}
            />
          }
        />

        <Route
          path="/property/:id"
          element={
            <PropertyPage
              properties={properties.properties}
              favourites={favourites}
              addToFavourites={addToFavourites}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
