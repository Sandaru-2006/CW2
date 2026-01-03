function SearchForm({
  filters,
  setFilters,
  showFavourites,
  setShowFavourites,
}) {
  function handleChange(e) {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* existing filters */}
      <div>
        <label>Property Type</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      <div>
        <label>Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Min Bedrooms</label>
        <input
          type="number"
          name="minBeds"
          value={filters.minBeds}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Max Bedrooms</label>
        <input
          type="number"
          name="maxBeds"
          value={filters.maxBeds}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Postcode Area</label>
        <input
          type="text"
          name="postcode"
          placeholder="e.g. BR5"
          value={filters.postcode}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={showFavourites}
            onChange={() => setShowFavourites(!showFavourites)}
          />
          Favourites
        </label>
      </div>
    </form>
  );
}

export default SearchForm;
