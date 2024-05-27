import { popularCities } from "../cities/popularCities";
import { allCities } from "../cities/allCities";

describe("popularCities", () => {
  it("should exist in allCities", () => {
    const allCitiesNames = allCities.map(city => city.n);
    popularCities.map(popularCity => {
      if (!allCitiesNames.includes(popularCity)) {
        console.log("City not found in master list: ", popularCity);
      }
      expect(allCitiesNames.includes(popularCity)).toBe(true);
    });
  });
});
