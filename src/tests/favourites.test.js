test("adds and removes favourites correctly", () => {
  let favourites = [];

  const toggleFavourite = (id) => {
    favourites = favourites.includes(id)
      ? favourites.filter((f) => f !== id)
      : [...favourites, id];
  };

  toggleFavourite("prop1");
  expect(favourites).toContain("prop1");

  toggleFavourite("prop1");
  expect(favourites).not.toContain("prop1");
});
