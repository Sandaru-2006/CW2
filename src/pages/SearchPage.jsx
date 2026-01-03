import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

function SearchPage({ properties, favourites, addToFavourites }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialise filters from URL
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minBeds: searchParams.get("minBeds") || "",
    maxBeds: searchParams.get("maxBeds") || "",
    postcode: searchParams.get("postcode") || "",
    dateFrom: searchParams.get("dateFrom") || "",
    dateTo: searchParams.get("dateTo") || "",
  });

  const [showFavourites, setShowFavourites] = useState(
    searchParams.get("favs") === "true"
  );

  // Sync filters to URL whenever they change
  useEffect(() => {
    const params = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    if (showFavourites) params.favs = "true";

    setSearchParams(params);
  }, [filters, showFavourites, setSearchParams]);

  const filteredProperties = properties.filter((prop) => {
    // 1. Type
    if (filters.type && prop.type !== filters.type) return false;

    // 2. Price
    if (filters.minPrice && prop.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && prop.price > Number(filters.maxPrice)) return false;

    // 3. Bedrooms
    if (filters.minBeds && prop.bedrooms < Number(filters.minBeds))
      return false;
    if (filters.maxBeds && prop.bedrooms > Number(filters.maxBeds))
      return false;

    // 4. Postcode area
    if (filters.postcode) {
      const postcode = prop.location.split(" ").slice(-1)[0];
      if (!postcode.toLowerCase().startsWith(filters.postcode.toLowerCase()))
        return false;
    }

    // 5. Date added
    if (filters.dateFrom || filters.dateTo) {
      const addedDate = new Date(
        `${prop.added.year}-${prop.added.month}-${prop.added.day}`
      );
      if (filters.dateFrom && addedDate < new Date(filters.dateFrom))
        return false;
      if (filters.dateTo && addedDate > new Date(filters.dateTo)) return false;
    }

    // 6. Favourites filter
    if (showFavourites && !favourites.includes(prop.id)) return false;

    return true;
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
