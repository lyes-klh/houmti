const City = require("../models/cityModel");
const Neighborhood = require("../models/neighborhoodModel");

const defaultCities = [
  {
    cityName: "Baghlia",
    zipCode: "35014",
    countryName: "Algeria",
    countryISOCode: "DZ",
    countryCode: "213",
  },
];

const defaultNeighborhoods = [{ neighborhoodName: "Colonel Amirouche", zipCode: 35014 }];

async function ensureDefaultData() {
  try {
    console.log("Checking default data...");

    for (const city of defaultCities) {
      const exists = await City.findOne({ cityName: city.cityName, countryName: city.countryName });
      if (!exists) {
        const cityCreated = await City.create(city);
        city._id = cityCreated._id;
      }
    }

    // Ensure neighborhoods
    for (const neighborhood of defaultNeighborhoods) {
      const city = await City.findOne({ zipCode: neighborhood.zipCode });
      const exists = await Neighborhood.findOne({
        neighborhoodName: neighborhood.neighborhoodName,
      });
      if (!exists) {
        await Neighborhood.create({
          neighborhoodName: neighborhood.neighborhoodName,
          city: city._id,
        });
      }
    }

    console.log("Default data ensured.");
  } catch (error) {
    console.error("Error ensuring default data:", error);
  }
}

module.exports = ensureDefaultData;
