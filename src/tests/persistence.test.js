test("favourites are stored in localStorage", () => {
  const favourites = ["prop1", "prop2"];
  localStorage.setItem("favourites", JSON.stringify(favourites));

  const stored = JSON.parse(localStorage.getItem("favourites"));
  expect(stored).toEqual(favourites);
});
