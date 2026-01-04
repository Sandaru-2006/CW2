const properties = require("../data/properties.json");

test("filters properties by type", () => {
  const result = properties.properties.filter((p) => p.type === "House");
  expect(result.every((p) => p.type === "House")).toBe(true);
});

test("filters properties by minimum price", () => {
  const minPrice = 500000;
  const result = properties.properties.filter((p) => p.price >= minPrice);
  expect(result.length).toBeGreaterThan(0);
});
