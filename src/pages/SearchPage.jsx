import { useState } from "react";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

function SearchPage({ properties, favourites, addToFavourites }) {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    postcode: "",
    dateFrom: "",
    dateTo: "",
  });

  const [showFavourites, setShowFavourites] = useState(false);

  const filteredProperties = properties.filter((prop) => {
    // 1. filter by Type
    if (filters.type && prop.type !== filters.type) return false;

    // 2️. filter by Price
    if (filters.minPrice && prop.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && prop.price > Number(filters.maxPrice)) return false;

    // 3️. filter by Bedrooms
    if (filters.minBeds && prop.bedrooms < Number(filters.minBeds))
      return false;
    if (filters.maxBeds && prop.bedrooms > Number(filters.maxBeds))
      return false;

    // 4️. filter by Postcode area
    if (filters.postcode) {
      // extract last word from location (e.g., "BR5")
      const postcode = prop.location.split(" ").slice(-1)[0];
      if (!postcode.toLowerCase().startsWith(filters.postcode.toLowerCase()))
        return false;
    }

    // 5️. filter by Date added
    if (filters.dateFrom || filters.dateTo) {
      const addedDate = new Date(
        `${prop.added.year}-${prop.added.month}-${prop.added.day}`
      );
      if (filters.dateFrom && addedDate < new Date(filters.dateFrom))
        return false;
      if (filters.dateTo && addedDate > new Date(filters.dateTo)) return false;
    }

    // 6. filter by favourites if toggle is on
    if (showFavourites && !favourites.includes(prop.id)) return false;

    return true; // passes all filters
  });

  return (
    <div>
      <h2>Find Your Next Home</h2>

      <SearchForm
        filters={filters}
        setFilters={setFilters}
        showFavourites={showFavourites}
        setShowFavourites={setShowFavourites}
      />

      <h3>Available Properties</h3>
      <ResultsList
        properties={filteredProperties}
        addToFavourites={addToFavourites}
      />
    </div>
  );
}

export default SearchPage;
