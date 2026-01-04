const properties = require("../data/properties.json");

test("each property has at least 6 images", () => {
  properties.properties.forEach((p) => {
    expect(p.images.length).toBeGreaterThanOrEqual(6);
  });
});
