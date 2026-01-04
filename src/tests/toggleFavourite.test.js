test("does not add duplicate favourites", () => {
  let favourites = [];

  const addFavourite = (id) => {
    if (!favourites.includes(id)) {
      favourites.push(id);
    }
  };

  addFavourite("prop2");
  addFavourite("prop2");

  expect(favourites.length).toBe(1);
  expect(favourites).toEqual(["prop2"]);
});
